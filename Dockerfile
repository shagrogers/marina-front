# syntax=docker/dockerfile:1
#
# Imagem multi-stage.
#
# ## `node:24-alpine`, e não `node:20-alpine` como pede a doc 2 §4
#
# A doc 2 pede node:20. O Node 20 saiu de suporte (EOL em abril de 2026) e não
# recebe mais correções de segurança. O front processa cookie de sessão e
# resposta de API: rodar em uma runtime sem correção é o pior lugar possível.
#
# A 24 é a LTS ativa (outubro de 2025), e é a primeira que o Next 16 suporta
# com estabilidade. O desvio está registrado no README, como foi feito com o Go
# saindo de 1.23 para 1.27.

# ---------------------------------------------------------------------------
# Estágio de dependências
# ---------------------------------------------------------------------------
FROM node:24-alpine AS dependencias
WORKDIR /app

# O lockfile é copiado sozinho para que a camada de `npm ci` seja reaproveitada
# enquanto as dependências não mudarem. Sem isto, cada build de código — que muda
# o package.json raramente — reinstala 465 pacotes.
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# ---------------------------------------------------------------------------
# Estágio de build
# ---------------------------------------------------------------------------
FROM node:24-alpine AS construcao
WORKDIR /app

COPY --from=dependencias /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# `output: 'standalone'` gera um servidor com o mínimo de arquivos; sem esta
# variável o Next embute a PUBLIC_URL do build no bundle, e a imagem deixaria de
# ser portável entre máquina e container.
ENV NEXT_PUBLIC_API_URL=
RUN npm run build

# ---------------------------------------------------------------------------
# Estágio de execução
# ---------------------------------------------------------------------------
FROM node:24-alpine AS execucao
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# `tini` como PID 1: sem ele, o Node é o PID 1 e ignora SIGTERM — o que faz
# `docker compose down` esperar o timeout do Docker antes de matar o container.
RUN apk add --no-cache tini

# O usuário `node` já vem na imagem base e não é root.
COPY --from=construcao --chown=node:node /app/public ./public
COPY --from=construcao --chown=node:node /app/.next/standalone ./
COPY --from=construcao --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# `-H 0.0.0.0` na flag é uma primeira tentativa que o Next 16 ignora: o
# `server.js` do standalone escolhe a interface por `process.env.HOSTNAME`, e o
# Docker injeta `HOSTNAME` com o id do container na CRIAÇÃO, sobrescrevendo este
# ENV. A correção que funciona é `HOSTNAME=0.0.0.0` no `environment:` do Compose
# (o Compose tem precedência sobre a injeção do Docker) — ver docker-compose.yml.
#
# Sem ela, o servidor ouve só no IP do container: a porta publicada funciona por
# acaso, porque o Docker mapeia para o IP do container, e o healthcheck em
# localhost leva "Connection refused" indefinidamente — o container fica
# `unhealthy` mesmo estando servindo.
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js", "-H", "0.0.0.0"]
