// gerar-cliente.mjs — gera o cliente de API TIPADO a partir do contrato.
//
// ## A conversão Swagger 2.0 -> OpenAPI 3 é NECESSÁRIA, e é uma lacuna
//
// A API publica `docs/swagger.json` no formato **Swagger 2.0**, que é o que o
// `swag` gera (a doc 2 §3.1 fala em "Swagger", e o `swag` é a ferramenta da
// doc). O `openapi-typescript` só aceita OpenAPI 3.x e aborta com:
//
//     Unsupported Swagger version: 2.x. Use OpenAPI 3.x instead.
//
// Converto em vez de escrever tipos à mão. Converter preserva a verdade — o
// tipo gerado continua vindo do contrato — e o convertido fica versionado em
// `src/lib/api/contrato.openapi.json` para que a verificação de divergência
// continue funcionando e a conversão seja auditável. Escrever tipos à mão
// perderia a única garantia que importa: web e mobile consumirem o mesmo
// contrato.
//
// ## A conversão só roda quando a FONTE muda
//
// O "mudou" é o SHA-256 do arquivo de origem, guardado num sidecar. Converter a
// cada execução reescreveria o arquivo com o mesmo conteúdo e sujaria o git a
// cada `npm run api:gerar`, escondendo a mudança real de contrato no meio de
// ruído.
//
// O SHA vai em arquivo separado, e não como comentário no JSON: um `//` no
// começo do arquivo tornaria o documento inválido para o parser do OpenAPI.
//
// Uso: node scripts/gerar-cliente.mjs
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { astToString } from 'openapi-typescript';
import openapiTS from 'openapi-typescript';
import swagger2openapi from 'swagger2openapi';

const aqui = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(aqui, '..');

/** Contrato: o documento publicado e versionado pela API. */
export const CONTRATO = resolve(raiz, '../boats-api/docs/swagger.json');

/** O mesmo contrato, convertido para OpenAPI 3 e versionado. */
export const CONTRATO_CONVERTIDO = resolve(raiz, 'src/lib/api/contrato.openapi.json');

/** Resumo do conteúdo da fonte, para decidir se reconverte. */
const CONTRATO_RESUMO = `${CONTRATO_CONVERTIDO}.sha256`;

/** Onde o cliente gerado vive. */
export const DESTINO = resolve(raiz, 'src/lib/api/esquema.ts');

/**
 * Caminho do contrato RELATIVO à raiz do web.
 *
 * Relativo porque ele vai escrito no banner do arquivo gerado, e caminho
 * absoluto vaza `C:\Users\...` num arquivo versionado.
 */
export function contratoRelativo() {
  return relative(raiz, CONTRATO).split('\\').join('/');
}

/** Lê a fonte do contrato. Falha com mensagem legível se ela não existir. */
async function lerFonte() {
  const bruto = await readFile(CONTRATO, 'utf8');
  if (bruto.trim() === '') {
    throw new Error(`contrato vazio: ${contratoRelativo()}`);
  }
  return bruto;
}

function resumoDe(texto) {
  return createHash('sha256').update(texto).digest('hex');
}

/**
 * Devolve o caminho de um OpenAPI 3 equivalente, convertendo se a fonte mudou.
 */
async function garantirConvertido(bruto) {
  const resumo = resumoDe(bruto);
  const guardado = await readFile(CONTRATO_RESUMO, 'utf8').catch(() => null);
  if (guardado === resumo) {
    const existe = await readFile(CONTRATO_CONVERTIDO, 'utf8').catch(() => null);
    if (existe !== null) {
      return CONTRATO_CONVERTIDO;
    }
  }

  // `patch: false` é obrigatório: em `true` o swagger2openapi devolve um
  // documento de PATCH, e o openapi-typescript aborta. E o nome da flag sugere
  // o oposto do que significa na primeira leitura.
  const convertido = await swagger2openapi.convertStr(bruto, {
    patch: false,
    warnOnly: true,
  });

  // O swagger2openapi v7 devolve um objeto com o estado interno da conversão, e
  // o documento convertido fica em `.openapi`. Sem este desinvolucro, o
  // openapi-typescript lê `.openapi` como OBJETO e falha com
  // "Unsupported OpenAPI version: [object Object]".
  const documento = desinvolucrar(convertido);
  if (documento.openapi !== '3.0.0' && !String(documento.openapi).startsWith('3.')) {
    throw new Error(
      `conversão não produziu OpenAPI 3: veio "${String(documento.openapi)}"`,
    );
  }

  const corpo = `${JSON.stringify(documento, null, 2)}\n`;
  await mkdir(dirname(CONTRATO_CONVERTIDO), { recursive: true });
  await writeFile(CONTRATO_CONVERTIDO, corpo, 'utf8');
  await writeFile(CONTRATO_RESUMO, resumo, 'utf8');
  return CONTRATO_CONVERTIDO;
}

/** Tira o estado interno e devolve o documento OpenAPI. */
function desinvolucrar(bruto) {
  const base = typeof bruto === 'string' ? JSON.parse(bruto) : bruto;
  if (base && typeof base === 'object' && !Array.isArray(base) && base.openapi && typeof base.openapi === 'object') {
    return base.openapi;
  }
  return base;
}

/** Monta o texto do cliente, sem tocar no disco. */
export async function textoGerado() {
  const bruto = await lerFonte();
  const convertido = await garantirConvertido(bruto);
  const ast = await openapiTS(pathToFileURL(convertido));

  const banner = [
    '// -----------------------------------------------------------------------------',
    '// ARQUIVO GERADO. NÃO EDITE À MÃO.',
    '//',
    `// Fonte:     ${contratoRelativo()} (Swagger 2.0, convertido para OpenAPI 3)`,
    '// Gerador:   openapi-typescript + swagger2openapi',
    '// Comando:   npm run api:gerar',
    '// Verificar: npm run api:verificar  (falha se este arquivo divergir do contrato)',
    '//',
    '// O tipo de toda resposta da API vem daqui. Escrever um tipo à mão é perder a',
    '// garantia de que web e mobile consomem o mesmo contrato.',
    '// -----------------------------------------------------------------------------',
    '',
  ].join('\n');

  return `${banner}${astToString(ast)}\n`;
}

/** Gera e escreve o cliente. Devolve o texto gerado. */
export async function gerar() {
  const saida = await textoGerado();
  await mkdir(dirname(DESTINO), { recursive: true });
  await writeFile(DESTINO, saida, 'utf8');
  return saida;
}

// Executa quando chamado direto (`node scripts/gerar-cliente.mjs`).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const saida = await gerar();
  process.stdout.write(
    `cliente gerado: ${contratoRelativo()} -> src/lib/api/esquema.ts ` +
      `(${saida.split('\n').length} linhas)\n`,
  );
}
