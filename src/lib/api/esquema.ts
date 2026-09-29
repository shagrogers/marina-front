// -----------------------------------------------------------------------------
// ARQUIVO GERADO. NÃO EDITE À MÃO.
//
// Fonte:     ../boats-api/docs/swagger.json (Swagger 2.0, convertido para OpenAPI 3)
// Gerador:   openapi-typescript + swagger2openapi
// Comando:   npm run api:gerar
// Verificar: npm run api:verificar  (falha se este arquivo divergir do contrato)
//
// O tipo de toda resposta da API vem daqui. Escrever um tipo à mão é perder a
// garantia de que web e mobile consomem o mesmo contrato.
// -----------------------------------------------------------------------------
export interface paths {
    "/admin/embarcacoes/verificacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Fila de verificação de embarcações
         * @description Embarcações aguardando conferência, da mais antiga para a mais recente.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Página */
                    pagina?: number;
                    /** @description Itens por página */
                    por_pagina?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"][];
                            meta?: components["schemas"]["resposta.Meta"];
                        };
                    };
                };
                /** @description Perfil sem acesso */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/embarcacoes/{id}/verificar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verificar embarcação
         * @description Aprova a embarcação (torna visível no marketplace) ou reprova com um motivo. Só o administrador chega aqui.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da embarcação */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Decisão */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["embarcacao.EntradaVerificar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"];
                        };
                    };
                };
                /** @description Perfil sem acesso */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/marinas/verificacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Fila de verificaÃ§Ã£o de marinas
         * @description Marinas aguardando conferÃªncia, da mais antiga para a mais recente.
         */
        get: {
            parameters: {
                query?: {
                    /** @description PÃ¡gina */
                    pagina?: number;
                    /** @description Itens por pÃ¡gina */
                    por_pagina?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarina"][];
                            meta?: components["schemas"]["resposta.Meta"];
                        };
                    };
                };
                /** @description Perfil sem acesso */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/marinas/{id}/verificar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Verificar marina
         * @description Aprova ou rejeita uma marina pendente. RejeiÃ§Ã£o exige motivo.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            /** @description DecisÃ£o */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaVerificarMarina"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarina"];
                        };
                    };
                };
                /** @description Perfil sem acesso */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/relatorios/mensal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Relatório mensal
         * @description Agregado do mês, calculado sob demanda e gravado. Exige ?mes=AAAA-MM; sem o parâmetro, usa o mês corrente. O relatório é congelado na tabela relatorios_mensais, porque ler um valor recalculado depois não conta a história do que ele valia.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Mês no formato AAAA-MM */
                    mes?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["notificacao.DTORelatorioMensal"];
                        };
                    };
                };
                /** @description Mês inválido */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/admin/sos/em-risco": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Chamados de SOS em risco
         * @description Painel de Administração (doc 1 §4.3). O risco é calculado na LEITURA: a lista não depende de o worker ter rodado.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOEmRisco"][];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/cadastro": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Criar conta
         * @description Cria um usuário e concede automaticamente o papel 'cliente'. Nenhum outro papel é concedido aqui: 'marina' e 'prestador' passam pela fila de verificação e 'admin' só existe por seed.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Dados do cadastro */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["auth.EntradaCadastro"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["auth.RespostaAutenticado"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description E-mail já cadastrado */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/eu": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Perfil do usuário logado
         * @description Devolve o usuário autenticado com todos os papéis, inclusive os pendentes. É o que alimenta a sidebar, cujo bloco OPERAÇÃO muda conforme a persona (doc 1 §2.1).
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["usuario.DTO"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fazer login
         * @description Confere as credenciais e devolve um par access + refresh. O access vive 15 minutos; o refresh, 30 dias, e é rotacionado a cada renovação.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Credenciais */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["auth.EntradaLogin"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["auth.RespostaAutenticado"];
                        };
                    };
                };
                /** @description E-mail ou senha incorretos */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/renovar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Renovar o access token
         * @description Recebe o refresh token e devolve um par novo. O refresh antigo é rotacionado: se ele voltar a ser apresentado, é tratado como clonagem e todas as sessões daquele login são revogadas.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Refresh no corpo (mobile). No web, use o cookie. */
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["auth.EntradaRenovar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["auth.RespostaAutenticado"];
                        };
                    };
                };
                /** @description Sessão expirada ou comprometida */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sair": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sair da sessão
         * @description Revoga o refresh token apresentado. Idempotente: chamar duas vezes não gera erro.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["auth.RespostaMensagem"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/sair-todos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Sair de todos os dispositivos
         * @description Revoga todas as sessões abertas do usuário. Usar quando se suspeita de acesso não autorizado.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["auth.RespostaMensagem"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Pedir diária
         * @description Cria o pedido em "solicitada". O preço é calculado e gravado no momento do pedido, e não recalcula depois: se o proprietário mudar a diária, o pedido já feito continua valendo o que foi cobrado.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Pedido */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["diaria.EntradaSolicitar"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Lancha já reservada no período */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Lancha sem diária ou pequena demais */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/disponiveis": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Buscar lanchas disponíveis
         * @description Tela 4.14. Filtra por raio, período, número de pessoas e tripulação. O preço total vem no resultado, já calculado para os parâmetros pedidos. Só entram embarcações com diária definida e verificadas.
         */
        get: {
            parameters: {
                query: {
                    /** @description Latitude da busca */
                    lat: number;
                    /** @description Longitude da busca */
                    lng: number;
                    /** @description Raio em km (padrão 25) */
                    raio_km?: number;
                    /** @description Retirada, RFC3339 */
                    inicio_em: string;
                    /** @description Devolução, RFC3339 */
                    fim_em: string;
                    /** @description Quantas pessoas */
                    pessoas: number;
                    /** @description com_marinheiro|so_skipper|sem_tripulacao */
                    tripulacao: string;
                    /** @description Quantidade (padrão 20) */
                    limite?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTOOferta"][];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/meus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Minhas diárias */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"][];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/recebidas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Diárias recebidas
         * @description Os pedidos das embarcações do proprietário. Com ?status para filtrar.
         */
        get: {
            parameters: {
                query?: {
                    /** @description solicitada|aceita|confirmada|... */
                    status?: string;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"][];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Detalhe de uma diária */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Aceitar pedido de diária
         * @description Transacional: dois vizinhos clicando ao mesmo tempo produzem um aceite e um 409.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Conflict */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancelar diária
         * @description Só o solicitante, e só enquanto não concluída.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}/concluir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Check-out da diária
         * @description Só o dono da embarcação, e só a partir de "confirmada".
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}/marcar-paga": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Marcar diária como paga
         * @description Não há gateway de pagamento: quem chama AFIRMA que o acerto foi combinado por fora (ex.: PIX) e a plataforma registra. A diária só chega em "confirmada" depois disso.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/diarias/{id}/recusar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Recusar pedido de diária */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da diária */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["diaria.DTODiaria"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/embarcacoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Listar embarcações do proprietário
         * @description Devolve as embarcações do usuário autenticado, inclusive as pendentes de verificação — é a lista que alimenta a Área do proprietário.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Página */
                    pagina?: number;
                    /** @description Itens por página */
                    por_pagina?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"][];
                            meta?: components["schemas"]["resposta.Meta"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        /**
         * Cadastrar embarcação
         * @description Cadastra a embarcação e, se for a primeira do usuário, concede automaticamente o papel 'proprietario'. A embarcação nasce com status pendente_verificacao e só aparece no marketplace depois que um admin conferir.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Dados da embarcação */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["embarcacao.EntradaCriar"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Limite de embarcações atingido */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/embarcacoes/publicas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Marketplace de embarcações
         * @description Lista só embarcações verificadas, com os filtros de tipo, marca, ano, preço e motor da tela 4.16.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Tipo, repetível ou separado por vírgula */
                    tipo?: "lancha" | "jetski" | "iate";
                    /** @description Marca */
                    marca?: string;
                    /** @description Ano mínimo */
                    ano_min?: number;
                    /** @description Ano máximo */
                    ano_max?: number;
                    /** @description Preço mínimo */
                    preco_min?: number;
                    /** @description Preço máximo */
                    preco_max?: number;
                    /** @description Nome do motor */
                    motor?: string;
                    /** @description Busca livre */
                    q?: string;
                    /** @description Ordenação */
                    ordem?: "mais_recentes" | "maior_preco" | "menor_preco" | "maior_ano" | "menor_ano" | "nome";
                    /** @description Página */
                    pagina?: number;
                    /** @description Itens por página */
                    por_pagina?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"][];
                            meta?: components["schemas"]["resposta.Meta"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/embarcacoes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Buscar embarcação
         * @description Devolve uma embarcação pelo id. O dono enxerga a própria mesmo pendente de verificação; terceiros só enxergam as ativas.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da embarcação */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        /**
         * Atualizar embarcação
         * @description Atualiza os campos enviados. Campo ausente não é alterado. O status não é atualizável pelo dono: quem muda é a fila de verificação do admin.
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da embarcação */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Campos a alterar */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["embarcacao.EntradaAtualizar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["embarcacao.DTO"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        post?: never;
        /**
         * Excluir embarcação
         * @description Remove a embarcação do proprietário. É soft delete: a linha continua no banco para não quebrar reserva e repasse que referenciem este ID.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da embarcação */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Excluída */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cadastrar marina
         * @description Cria a marina com status pendente e concede ao dono o papel 'marina' com status pendente (nunca ativo direto).
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Dados da marina */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaCriarMarina"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarina"];
                        };
                    };
                };
                /** @description CNPJ ou coordenadas invÃ¡lidos */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description CNPJ jÃ¡ cadastrado */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas/publicas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Listar marinas verificadas
         * @description Devolve apenas marinas com status verificada. Aceita filtro opcional por raio (?lat&lng&raio_km), que ordena por distÃ¢ncia e inclui a distÃ¢ncia na resposta.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Latitude da origem */
                    lat?: number;
                    /** @description Longitude da origem */
                    lng?: number;
                    /** @description Raio em km */
                    raio_km?: number;
                    /** @description Filtra por cidade */
                    cidade?: string;
                    /** @description Filtra por UF */
                    uf?: string;
                    /** @description PÃ¡gina */
                    pagina?: number;
                    /** @description Itens por pÃ¡gina */
                    por_pagina?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarinaComDistancia"][];
                            meta?: components["schemas"]["resposta.Meta"];
                        };
                    };
                };
                /** @description Coordenadas ou raio invÃ¡lidos */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Detalhe de uma marina
         * @description O dono vÃª a prÃ³pria marina mesmo pendente. Terceiros sÃ³ veem marinas verificadas.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarina"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        /**
         * Editar marina
         * @description Apenas o dono pode editar. Campos ausentes nÃ£o sÃ£o alterados.
         */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Campos a alterar */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaAtualizarMarina"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOMarina"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas/{id}/painel": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Painel da marina
         * @description Devolve o que os dados atuais sustentam: total de vagas, ocupadas, livres, em manutenÃ§Ã£o, percentual de ocupaÃ§Ã£o, chegadas hoje e saÃ­das hoje.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.PainelMetricas"];
                        };
                    };
                };
                /** @description NÃ£o Ã© o dono */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas/{id}/pedidos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Listar pedidos de vaga da marina
         * @description Bloco AGORA da tela 4.7: pedidos aguardando, do mais antigo para o mais novo, com o tempo esperando e o tempo restante.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOPedidoMarina"][];
                        };
                    };
                };
                /** @description Não é o dono desta marina */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/marinas/{id}/vagas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Listar vagas de uma marina */
        get: {
            parameters: {
                query?: {
                    /** @description Filtra por tipo */
                    tipo?: "seca" | "molhada";
                    /** @description Filtra por status */
                    status?: "livre" | "ocupada" | "manutencao";
                };
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOVaga"][];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        /**
         * Cadastrar vaga
         * @description Apenas o dono da marina.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da marina */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Dados da vaga */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaCriarVaga"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOVaga"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description CÃ³digo jÃ¡ cadastrado nesta marina */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notificacoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Minhas notificações
         * @description Só as do próprio usuário. Aceita ?pagina e ?somente_nao_lidas.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Página (padrão 1) */
                    pagina?: number;
                    /** @description Só as não lidas */
                    somente_nao_lidas?: boolean;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["notificacao.DTONotificacao"][];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/notificacoes/{id}/marcar-lida": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Marcar notificação como lida
         * @description Só a própria notificação do próprio usuário. A de outra pessoa devolve 404.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da notificação */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["notificacao.DTONotificacao"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/prestadores/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Meu perfil de prestador */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["prestador.DTOPrestador"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        /** Editar perfil de prestador */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: components["requestBodies"]["prestador.EntradaPrestador"];
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["prestador.DTOPrestador"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        /**
         * Cadastrar perfil de prestador
         * @description Cria o perfil e concede o papel de prestador. O papel nasce PENDENTE: o prestador não aparece no matching de SOS até a verificação.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody: components["requestBodies"]["prestador.EntradaPrestador"];
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["prestador.DTOPrestador"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Já cadastrado */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Listar minhas reservas
         * @description Tela 4.5, com as três abas. O campo "aba" diz em qual delas a reserva cai: proximas, aguardando ou historico.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"][];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        /**
         * Pedir vaga numa marina
         * @description Cria um pedido dirigido à marina. NÃO trava vaga nem altera o status de nenhuma vaga: a marina escolhe a vaga ao aceitar.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Pedido */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["reserva.EntradaCriarPedidoVaga"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"];
                        };
                    };
                };
                /** @description Datas inválidas */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Unauthorized */
                401: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Embarcação não é sua */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Marina não verificada */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Detalhe de uma reserva
         * @description Só o solicitante e o dono da marina de destino enxergam o pedido.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da reserva */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas/{id}/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Aceitar pedido de vaga
         * @description A marina escolhe a vaga. Valida que a vaga é desta marina, não está em manutenção, comporta a embarcação e não conflita no período.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da reserva */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Vaga escolhida */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["reserva.EntradaAceitar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"];
                        };
                    };
                };
                /** @description Não é o dono desta marina */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Vaga em manutenção, de outra marina ou período conflitante */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancelar pedido
         * @description Só o solicitante cancela o próprio pedido.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da reserva */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Motivo */
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["reserva.EntradaCancelar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas/{id}/check-in": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fazer check-in
         * @description Cria a ocupação real a partir da reserva aceita. É aqui que ocupacoes_vaga nasce: aceitar não cria, porque uma reserva é futuro e a ocupação é agora.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da reserva */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOOcupacao"];
                        };
                    };
                };
                /** @description Check-in já feito ou vaga ocupada */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Reserva não aceita */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/reservas/{id}/recusar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Recusar pedido de vaga
         * @description Exige motivo, que volta para o solicitante.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da reserva */
                    id: string;
                };
                cookie?: never;
            };
            /** @description Motivo */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["reserva.EntradaRecusar"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["reserva.DTOReserva"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Abrir chamado de SOS
         * @description Recebe o resultado das sete etapas do wizard, já depois da triagem de segurança. Não há campo de risco de vida: quando a triagem identifica risco de vida, o client desvia para o 190 e esta rota não é chamada.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            /** @description Chamado */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["sos.EntradaCriarChamado"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamado"];
                        };
                    };
                };
                /** @description Bad Request */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Unprocessable Entity */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Chamado gravado, despacho falhou */
                503: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/meus": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Meus chamados de SOS */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamado"][];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/proximos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Chamados próximos do prestador
         * @description Tela 4.13. Só chamados abertos, dentro do raio de atuação do prestador, com a especialidade que ele atende.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Raio de busca, em km */
                    raio_km?: number;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOProximo"][];
                        };
                    };
                };
                /** @description Sem perfil de prestador */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Acompanhar chamado
         * @description A oitava tela, fora do wizard: status atual, prestador que aceitou e a timeline. O telefone do solicitante aparece só para quem pode agir.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID do chamado */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamadoDetalhe"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/{id}/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Aceitar chamado de SOS
         * @description Transacional: dois prestadores clicando ao mesmo tempo produzem um aceite e um 409.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID do chamado */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamado"];
                        };
                    };
                };
                /** @description Outro prestador já aceitou */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Transição inválida */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Cancelar chamado de SOS
         * @description Só o solicitante, e só enquanto não concluído.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID do chamado */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamado"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Já concluído */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/sos/chamados/{id}/concluir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Concluir chamado de SOS
         * @description Só o prestador que aceitou.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID do chamado */
                    id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["sos.DTOChamado"];
                        };
                    };
                };
                /** @description Não foi quem aceitou */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vagas/{vaga_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Editar vaga */
        put: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da vaga */
                    vaga_id: string;
                };
                cookie?: never;
            };
            /** @description Campos a alterar */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaAtualizarVaga"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOVaga"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        post?: never;
        /**
         * Excluir vaga
         * @description NÃ£o Ã© possÃ­vel excluir vaga ocupada.
         */
        delete: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da vaga */
                    vaga_id: string;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description ExcluÃ­da */
                204: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Vaga ocupada */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vagas/{vaga_id}/liberar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Registrar saÃ­da de embarcaÃ§Ã£o
         * @description Marca a ocupaÃ§Ã£o como encerrada e devolve a vaga para livre.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da vaga */
                    vaga_id: string;
                };
                cookie?: never;
            };
            /** @description Dados da saÃ­da */
            requestBody?: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaLiberarVaga"];
                };
            };
            responses: {
                /** @description OK */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOOcupacaoVaga"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Vaga nÃ£o estÃ¡ ocupada */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/vagas/{vaga_id}/ocupar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Registrar entrada de embarcaÃ§Ã£o
         * @description Ocupar uma vaga e marcar a mesma como ocupada. Falha se a vaga jÃ¡ estiver ocupada ou em manutenÃ§Ã£o.
         */
        post: {
            parameters: {
                query?: never;
                header?: never;
                path: {
                    /** @description ID da vaga */
                    vaga_id: string;
                };
                cookie?: never;
            };
            /** @description Dados da ocupaÃ§Ã£o */
            requestBody: {
                content: {
                    "application/json": components["schemas"]["marina.EntradaOcuparVaga"];
                };
            };
            responses: {
                /** @description Created */
                201: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            data?: components["schemas"]["marina.DTOOcupacaoVaga"];
                        };
                    };
                };
                /** @description Forbidden */
                403: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
                /** @description Vaga jÃ¡ ocupada */
                409: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["resposta.Envelope"] & {
                            erro?: components["schemas"]["resposta.DetalheErro"];
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        "auth.EntradaCadastro": {
            /**
             * @description E-mail que identifica a conta. Guardado em minúsculas.
             *     required: true
             *     example: marina.kowalski@exemplo.com
             */
            email: string;
            /**
             * @description Nome completo da pessoa.
             *     required: true
             *     example: Marina Kowalski
             */
            nome: string;
            /**
             * @description Senha de acesso. Mínimo de 10 caracteres, com maiúsculas, minúsculas,
             *     números e símbolos.
             *     required: true
             *     example: VentoAlto#2026
             */
            senha: string;
            /**
             * @description Telefone com DDD. Opcional na Fase 1; obrigatório quando o módulo de SOS
             *     passar a notificar por telefone.
             *     example: +55 27 99876-5432
             */
            telefone?: string;
        };
        "auth.EntradaLogin": {
            /**
             * @description E-mail cadastrado.
             *     required: true
             *     example: marina.kowalski@exemplo.com
             */
            email: string;
            /**
             * @description Manter conectado. Quando verdadeiro, o refresh token tem o prazo cheio
             *     de 30 dias em vez do prazo de sessão curta.
             *     example: true
             */
            manter_conectado?: boolean;
            /**
             * @description Senha de acesso.
             *     required: true
             */
            senha: string;
        };
        "auth.EntradaRenovar": {
            /**
             * @description Refresh token. Ignore quando estiver usando o cookie httpOnly.
             *     example: 8xK2v...
             */
            refresh_token?: string;
        };
        "auth.RespostaAutenticado": {
            access_token?: string;
            /** @example 900 */
            expires_in?: number;
            refresh_token?: string;
            /** @example Bearer */
            token_type?: string;
            usuario?: components["schemas"]["usuario.DTO"];
        };
        "auth.RespostaMensagem": {
            /** @example Até logo! */
            mensagem?: string;
        };
        "diaria.DTODiaria": {
            concluida_em?: string;
            confirmada_em?: string;
            dias?: number;
            embarcacao_id?: string;
            fim_em?: string;
            id?: string;
            inicio_em?: string;
            motivo_cancelamento?: string;
            motivo_recusa?: string;
            nome_embarcacao?: string;
            pessoas?: number;
            /** @example R$ 1.960,00 */
            preco_total?: string;
            proprietario_id?: string;
            /** @example solicitada */
            status?: components["schemas"]["diaria.StatusDiaria"];
            /** @example pendente_externo */
            status_pagamento?: components["schemas"]["diaria.StatusPagamento"];
            /**
             * @description TransicoesPossiveis diz o que ainda dá para fazer. A tela usa para
             *     mostrar os botões certos sem duplicar a máquina de estados no front — e
             *     duplicar a máquina de estados no front é como o front e a API começam a
             *     discordar sobre o que é possível.
             */
            transicoes_possiveis?: string[];
            /** @example so_skipper */
            tripulacao?: components["schemas"]["diaria.NivelTripulacao"];
            /**
             * @description O preço é o que foi CONGELADO no pedido, e não o que a lancha custa hoje.
             *     A doc 1 §4.14 mostra "R$ 1.960" na lista e "R$ 1.960 confirmado" no
             *     detalhe, e são o mesmo número porque ele não se move.
             */
            valor_total_centavos?: number;
        };
        "diaria.DTOOferta": {
            /** @example R$ 0,00 */
            adicional_tripulacao?: string;
            /** @example 2022 */
            ano?: number;
            /** @example 8 */
            capacidade?: number;
            /** @example 6.4 */
            comprimento_m?: number;
            /**
             * @description O preço, já calculado para os parâmetros da busca. A doc 1 §4.14 mostra
             *     "R$ 1.960 · 2 dias" na mesma linha do nome da lancha, e quem browsear sem
             *     o preço à mão não escolhe.
             * @example 2
             */
            dias?: number;
            /** @example 4,2 */
            distancia_km?: string;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            embarcacao_id?: string;
            /**
             * @description Localização e distância, para a tela 4.14 dizer "a 4,2 km".
             * @example -20.3207
             */
            lat?: number;
            /** @example -40.3387 */
            lng?: number;
            /** @example Finesse */
            marca?: string;
            /** @example 212 */
            modelo?: string;
            /** @example 200 */
            motor_hp?: number;
            /** @example Finesse 212 */
            nome?: string;
            /** @example 196000 */
            preco_diaria_centavos?: number;
            /** @example R$ 1.960,00 */
            preco_total?: string;
            /** @example 196000 */
            preco_total_centavos?: number;
            /** @example 0 */
            preco_tripulacao_centavos?: number;
            /** @example so_skipper */
            tripulacao?: components["schemas"]["diaria.NivelTripulacao"];
            /** @example R$ 980,00 */
            valor_diaria?: string;
        };
        "diaria.EntradaSolicitar": {
            /** @description required: true */
            embarcacao_id: string;
            /** @description required: true */
            fim_em: string;
            /** @description required: true */
            inicio_em: string;
            /**
             * @description required: true
             *     example: 4
             */
            pessoas: number;
            /**
             * @description required: true
             *     example: so_skipper
             */
            tripulacao: string;
        };
        /** @enum {string} */
        "diaria.NivelTripulacao": "com_marinheiro" | "so_skipper" | "sem_tripulacao";
        /** @enum {string} */
        "diaria.StatusDiaria": "solicitada" | "aceita" | "confirmada" | "recusada" | "concluida" | "cancelada";
        /** @enum {string} */
        "diaria.StatusPagamento": "pendente_externo" | "confirmado_externo";
        "embarcacao.DTO": {
            /** @example true */
            aceita_propostas?: boolean;
            /** @example 2022 */
            ano?: number;
            atualizado_em?: string;
            /** @example 8 */
            capacidade?: number;
            /** @example 6.4 */
            comprimento_m?: number;
            criado_em?: string;
            /**
             * @description DescricaoCurta monta a linha "2022 · 6,40 m · Mercruiser 200 hp" que a
             *     doc 1 §4.1 mostra abaixo da foto. O front não precisa montar: a regra de
             *     formatação é da API, para web e app mostrarem igual.
             * @example 2022 · 6,40 m · Mercruiser 200 hp
             */
            descricao_curta?: string;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /** @example Finesse */
            marca?: string;
            /** @example ES-1234-56 */
            matricula?: string;
            /** @example 212 */
            modelo?: string;
            /** @example BRL */
            moeda?: string;
            /** @example 200 */
            motor_hp?: number;
            /** @example Mercruiser */
            motor_nome?: string;
            /** @example Finesse 212 */
            nome?: string;
            /** @example true */
            nota_nova?: boolean;
            /**
             * @description NumeroSerie é público de propósito: é o que permite ao cliente conferir
             *     a compatibilidade de uma peça (doc 1 §4.9) sem abrir um chamado.
             * @example MCR200-88213
             */
            numero_serie?: string;
            proprietario_id?: string;
            /** @example ativa */
            status?: components["schemas"]["embarcacao.StatusEmbarcacao"];
            /** @example lancha */
            tipo?: components["schemas"]["embarcacao.TipoEmbarcacao"];
            /** @example 189000 */
            valor?: number;
            /** @example 980 */
            valor_diaria?: number;
        };
        "embarcacao.EntradaAtualizar": {
            aceita_propostas?: boolean;
            ano?: number;
            capacidade?: number;
            comprimento_m?: number;
            marca?: string;
            matricula?: string;
            modelo?: string;
            motor_hp?: number;
            motor_nome?: string;
            nome?: string;
            nota_nova?: boolean;
            numero_serie?: string;
            registro_marina?: string;
            tipo?: components["schemas"]["embarcacao.TipoEmbarcacao"];
            valor?: number;
            valor_diaria?: number;
        };
        "embarcacao.EntradaCriar": {
            /**
             * @description Ano de fabricação. A linha de especificação da tela 4.1 mostra 2022.
             *     required: true
             *     minimum: 1900
             *     maximum: 2100
             *     example: 2022
             */
            ano: number;
            /**
             * @description Lotação. A tela 4.14 usa a pessoa como proxy de tamanho de lancha.
             *     required: true
             *     example: 8
             */
            capacidade: number;
            /**
             * @description Comprimento em metros. A tela 4.1 mostra 6,40 m.
             *     required: true
             *     example: 6.40
             */
            comprimento_m: number;
            /**
             * @description required: true
             *     example: Finesse
             */
            marca: string;
            /** @description example: ES-1234-56 */
            matricula?: string;
            /**
             * @description required: true
             *     example: 212
             */
            modelo: string;
            /**
             * @description required: true
             *     example: 200
             */
            motor_hp: number;
            /**
             * @description A tela 4.9 cruza peça com motor do usuário; o nome é consultável.
             *     required: true
             *     example: Mercruiser
             */
            motor_nome: string;
            /**
             * @description Nome pelo qual a embarcação é chamada. Na doc 1 aparece como "Finesse 212".
             *     required: true
             *     example: Finesse 212
             */
            nome: string;
            /**
             * @description Série do motor. É contra este número que a compatibilidade de peças é
             *     conferida (doc 1 §4.9).
             *     example: MCR200-88213
             */
            numero_serie?: string;
            /**
             * @description Registro na Marinha. É o documento que o admin confere na fila de
             *     verificação da tela 4.3.
             *     example: BR-123456789
             */
            registro_marina?: string;
            /**
             * @description Lancha, jetski ou iate — as abas da tela 4.16.
             *     required: true
             *     enum: lancha
             */
            tipo: components["schemas"]["embarcacao.TipoEmbarcacao"];
            /**
             * @description Preço de venda. Aceito mesmo com a embarcação ainda pendente, mas só é
             *     publicado depois da verificação.
             *     example: 189000.00
             */
            valor?: number;
            /**
             * @description Preço da diária, usado pelo fluxo de aluguel da tela 4.14.
             *     example: 980.00
             */
            valor_diaria?: number;
        };
        "embarcacao.EntradaVerificar": {
            /**
             * @description Aprovar true libera a embarcação para o marketplace; false reprova.
             *     required: true
             *     example: true
             */
            aprovar: boolean;
            /**
             * @description Motivo da reprovação. Exibido ao proprietário para que ele saiba o que
             *     corrigir.
             *     example: Registro da Marinha não confere com a matrícula informada.
             */
            motivo?: string;
        };
        /** @enum {string} */
        "embarcacao.StatusEmbarcacao": "pendente_verificacao" | "ativa" | "reprovada" | "indisponivel";
        /** @enum {string} */
        "embarcacao.TipoEmbarcacao": "lancha" | "jetski" | "iate";
        "geo.Ponto": {
            lat?: number;
            lng?: number;
        };
        "marina.DTOMarina": {
            atualizado_em?: string;
            cidade?: string;
            cnpj?: string;
            criado_em?: string;
            endereco?: string;
            geo?: components["schemas"]["geo.Ponto"];
            horario_abertura?: string;
            horario_fechamento?: string;
            id?: string;
            motivo_recusa?: string;
            nome?: string;
            status_verificacao?: components["schemas"]["marina.StatusVerificacaoMarina"];
            uf?: string;
        };
        "marina.DTOMarinaComDistancia": {
            atualizado_em?: string;
            cidade?: string;
            cnpj?: string;
            criado_em?: string;
            distancia_km?: number;
            distancia_texto?: string;
            endereco?: string;
            geo?: components["schemas"]["geo.Ponto"];
            horario_abertura?: string;
            horario_fechamento?: string;
            id?: string;
            motivo_recusa?: string;
            nome?: string;
            status_verificacao?: components["schemas"]["marina.StatusVerificacaoMarina"];
            uf?: string;
        };
        "marina.DTOOcupacaoVaga": {
            embarcacao_id?: string;
            entrada_em?: string;
            id?: string;
            saida_em?: string;
            saida_prevista_em?: string;
            vaga_id?: string;
        };
        "marina.DTOVaga": {
            atualizado_em?: string;
            codigo?: string;
            comprimento_max_m?: number;
            criado_em?: string;
            id?: string;
            marina_id?: string;
            status?: components["schemas"]["marina.StatusVaga"];
            tipo?: components["schemas"]["marina.TipoVaga"];
        };
        "marina.EntradaAtualizarMarina": {
            cidade?: string;
            endereco?: string;
            horario_abertura?: string;
            horario_fechamento?: string;
            lat?: number;
            lng?: number;
            nome?: string;
            uf?: string;
        };
        "marina.EntradaAtualizarVaga": {
            codigo?: string;
            comprimento_max_m?: number;
            status?: components["schemas"]["marina.StatusVaga"];
            tipo?: components["schemas"]["marina.TipoVaga"];
        };
        "marina.EntradaCriarMarina": {
            /**
             * @description required: true
             *     example: Vila Velha
             */
            cidade: string;
            /**
             * @description CNPJ sem pontos ou barras, apenas dÃ­gitos. Validado por dÃ­gito verificador.
             *     required: true
             *     example: 12345678000190
             */
            cnpj: string;
            /**
             * @description required: true
             *     example: Av. Nossa Senhora da Penha, 1200
             */
            endereco: string;
            /**
             * @description HorÃ¡rio de operaÃ§Ã£o no formato HH:MM.
             *     example: 06:00
             */
            horario_abertura?: string;
            /** @description example: 22:00 */
            horario_fechamento?: string;
            /**
             * @description required: true
             *     example: -20.3207
             */
            lat: number;
            /**
             * @description required: true
             *     example: -40.3387
             */
            lng: number;
            /**
             * @description required: true
             *     example: Marina da Barra
             */
            nome: string;
            /**
             * @description Sigla do estado, 2 letras.
             *     required: true
             *     example: ES
             */
            uf: string;
        };
        "marina.EntradaCriarVaga": {
            /**
             * @description required: true
             *     example: D-12
             */
            codigo: string;
            /**
             * @description required: true
             *     example: 8.50
             */
            comprimento_max_m: number;
            /**
             * @description required: true
             *     enum: seca
             */
            tipo: components["schemas"]["marina.TipoVaga"];
        };
        "marina.EntradaLiberarVaga": {
            saida_em?: string;
        };
        "marina.EntradaOcuparVaga": {
            /** @description required: true */
            embarcacao_id: string;
            entrada_em?: string;
            saida_prevista_em?: string;
        };
        "marina.EntradaVerificarMarina": {
            /**
             * @description Se verdadeiro, a marina Ã© aprovada e passa a aparecer na listagem pÃºblica.
             *     Se falso, Ã© rejeitada e o motivo Ã© devolvido ao dono.
             *     required: true
             */
            aprovar: boolean;
            /**
             * @description ExplicaÃ§Ã£o da rejeiÃ§Ã£o, visÃ­vel ao dono.
             *     example: CNPJ nÃ£o confere com o registro da Junta Comercial.
             */
            motivo?: string;
        };
        "marina.PainelMetricas": {
            chegadas_hoje?: number;
            pedido_mais_antigo?: string;
            /** @description Bloco AGORA da tela 4.7: os pedidos de vaga aguardando resposta. */
            pedidos_aguardando?: number;
            percentual_ocupacao?: number;
            saidas_hoje?: number;
            tempo_esperando?: string;
            tempo_restante?: string;
            total_vagas?: number;
            vagas_livres?: number;
            vagas_manutencao?: number;
            vagas_ocupadas?: number;
        };
        /** @enum {string} */
        "marina.StatusVaga": "livre" | "ocupada" | "manutencao";
        /** @enum {string} */
        "marina.StatusVerificacaoMarina": "pendente" | "verificada" | "rejeitada";
        /** @enum {string} */
        "marina.TipoVaga": "seca" | "molhada";
        "notificacao.DTONotificacao": {
            /** @example Há um chamado aberto a 4,2 km de você. */
            corpo?: string;
            criado_em?: string;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            lida?: boolean;
            lida_em?: string;
            recurso_id?: string;
            /** @example sos_chamado */
            recurso_tipo?: string;
            /** @example sos_chamado */
            tipo?: components["schemas"]["notificacao.TipoNotificacao"];
            /** @example Chamado de SOS perto de você */
            titulo?: string;
        };
        "notificacao.DTORelatorioMensal": {
            chamados_sos?: number;
            chamados_sos_aceitos?: number;
            gerado_em?: string;
            /**
             * @description GMVCentavos vem em CENTAVOS e NULL quando não houve receita. A divisão em
             *     reais é tarefa de exibição, e quem exibe é o front.
             *
             *     O campo é null, e não 0, por uma razão que a doc 1 §3.4 respeita: "não
             *     houve receita" e "a receita foi zero" são frases diferentes, e um painel
             *     que mostra 0 para as duas mente sobre uma delas.
             */
            gmv_centavos?: number;
            /** @example R$ 46.200,00 */
            gmv_formatado?: string;
            /** @example 2026-09 */
            mes?: string;
            ocupacao_media_pct?: number;
            reservas_aceitas?: number;
            reservas_canceladas?: number;
            reservas_concluidas?: number;
            reservas_total?: number;
        };
        /** @enum {string} */
        "notificacao.TipoNotificacao": "sos_chamado" | "sos_expirada" | "sos_sla_estourado" | "reserva_confirmada" | "relatorio_mensal" | "prestador_verificacao";
        "prestador.DTOPrestador": {
            atualizado_em?: string;
            criado_em?: string;
            descricao?: string;
            /** @example motor */
            especialidade?: components["schemas"]["prestador.Especialidade"];
            geo?: components["schemas"]["geo.Ponto"];
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /** @example Mar mecânica Espelho */
            nome_empresa?: string;
            /** @example 25 */
            raio_atuacao_km?: number;
            telefone?: string;
        };
        "prestador.EntradaPrestador": {
            /** @description example:_atendimento 24h em Vitória e Vila Velha */
            descricao?: string;
            /**
             * @description required: true
             *     example: motor
             */
            especialidade: string;
            /**
             * @description required: true
             *     example: -20.3207
             */
            lat: number;
            /**
             * @description required: true
             *     example: -40.3387
             */
            lng: number;
            /** @description required: true */
            nome_empresa: string;
            /** @description example: 25.00 */
            raio_atuacao_km?: number;
            /** @description example: 27999888888 */
            telefone?: string;
        };
        /** @enum {string} */
        "prestador.Especialidade": "motor" | "eletrica" | "vela" | "estrutura" | "civil" | "outro";
        "reserva.DTOOcupacao": {
            embarcacao_id?: string;
            entrada_em?: string;
            id?: string;
            saida_em?: string;
            saida_prevista_em?: string;
            vaga_id?: string;
        };
        "reserva.DTOPedidoMarina": {
            /**
             * @description Agrupamento da tela 4.5: Próximas, Aguardando, Histórico.
             * @example proximas
             */
            aba?: string;
            check_in_em?: string;
            criado_em?: string;
            embarcacao_id?: string;
            expira_em?: string;
            fim_em?: string;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            inicio_em?: string;
            marina_id?: string;
            motivo_cancelamento?: string;
            motivo_recusa?: string;
            nome_embarcacao?: string;
            nome_solicitante?: string;
            respondido_em?: string;
            /** @example aguardando_marina */
            status?: components["schemas"]["reserva.StatusReserva"];
            /** @example 2h14min */
            tempo_esperando?: string;
            /** @example 40min */
            tempo_restante?: string;
            /** @example vaga */
            tipo?: components["schemas"]["reserva.TipoReserva"];
            vaga_id?: string;
        };
        "reserva.DTOReserva": {
            /**
             * @description Agrupamento da tela 4.5: Próximas, Aguardando, Histórico.
             * @example proximas
             */
            aba?: string;
            check_in_em?: string;
            criado_em?: string;
            embarcacao_id?: string;
            expira_em?: string;
            fim_em?: string;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            inicio_em?: string;
            marina_id?: string;
            motivo_cancelamento?: string;
            motivo_recusa?: string;
            nome_embarcacao?: string;
            /** @description Preenchido só onde a tela precisa. Ver DTOPedidoMarina. */
            nome_solicitante?: string;
            respondido_em?: string;
            /** @example aguardando_marina */
            status?: components["schemas"]["reserva.StatusReserva"];
            /** @example vaga */
            tipo?: components["schemas"]["reserva.TipoReserva"];
            vaga_id?: string;
        };
        "reserva.EntradaAceitar": {
            /**
             * @description Vaga escolhida pela marina. É a marina que decide, não o solicitante.
             *     required: true
             */
            vaga_id: string;
        };
        "reserva.EntradaCancelar": {
            /** @description example: Mudei as datas. */
            motivo?: string;
        };
        "reserva.EntradaCriarPedidoVaga": {
            /**
             * @description Embarcação que ficará na vaga. Precisa ser de quem pede.
             *     required: true
             */
            embarcacao_id: string;
            /**
             * @description Fim da estadia, depois do início.
             *     required: true
             */
            fim_em: string;
            /**
             * @description Início da estadia.
             *     required: true
             */
            inicio_em: string;
            /**
             * @description Marina para a qual o pedido é dirigido.
             *     required: true
             */
            marina_id: string;
        };
        "reserva.EntradaRecusar": {
            /**
             * @description Explicação que volta para o solicitante.
             *     required: true
             *     example: Sem vaga molhada livre nesse período.
             */
            motivo: string;
        };
        /** @enum {string} */
        "reserva.StatusReserva": "aguardando_marina" | "aceita" | "recusada" | "expirada" | "cancelada" | "concluida";
        /** @enum {string} */
        "reserva.TipoReserva": "vaga" | "diaria" | "evento" | "curso" | "manutencao";
        "resposta.DetalheErro": {
            /** @description Campos traz violações por campo em erros de validação. */
            campos?: {
                [key: string]: string;
            };
            /**
             * @description Codigo é estável e serve para o front ramificar por código, não por
             *     texto (o texto pode mudar; a doc 1 §3.4 prioriza microcopy em PT-BR).
             * @example senha_incorreta
             */
            codigo?: string;
            /**
             * @description Mensagem é amigável e já vem pronta para exibir.
             * @example E-mail ou senha incorretos.
             */
            mensagem?: string;
        };
        "resposta.Envelope": {
            dados?: unknown;
            erro?: components["schemas"]["resposta.DetalheErro"];
            /** @description Meta carrega paginação e avisos quando aplicável. */
            meta?: components["schemas"]["resposta.Meta"];
        };
        "resposta.Meta": {
            pagina?: number;
            por_pagina?: number;
            request_id?: string;
            total?: number;
            total_paginas?: number;
        };
        "sos.DTOChamado": {
            aceito_em?: string;
            atualizado_em?: string;
            concluido_em?: string;
            criado_em?: string;
            /**
             * @description EmRisco e os tempos vêm do status EFETIVO calculado na leitura, e não
             *     do worker. Ver Chamado.EmRisco.
             */
            em_risco?: boolean;
            embarcacao_descricao_livre?: string;
            embarcacao_id?: string;
            geo?: components["schemas"]["geo.Ponto"];
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /** @example pane_motor */
            motivo?: components["schemas"]["sos.MotivoSOS"];
            /** @example 4 */
            pessoas_a_bordo?: number;
            /** @description Prestador só aparece preenchido depois do aceite. */
            prestador_id?: string;
            sla_vence_em?: string;
            /** @example notificado */
            status?: components["schemas"]["sos.StatusSOS"];
            /** @example 4min */
            tempo_atraso?: string;
            /** @example 12min */
            tempo_espera?: string;
            /** @example preciso_de_ajuda_urgente */
            urgencia?: components["schemas"]["sos.Urgencia"];
        };
        "sos.DTOChamadoDetalhe": {
            aceito_em?: string;
            atualizado_em?: string;
            concluido_em?: string;
            /**
             * @description Contato do solicitante SÓ aparece aqui, e só para quem pode agir: o
             *     solicitante e o prestador que aceitou. Terceiro vê o chamado sem o
             *     telefone.
             */
            contato?: string;
            criado_em?: string;
            /**
             * @description EmRisco e os tempos vêm do status EFETIVO calculado na leitura, e não
             *     do worker. Ver Chamado.EmRisco.
             */
            em_risco?: boolean;
            embarcacao_descricao_livre?: string;
            embarcacao_id?: string;
            geo?: components["schemas"]["geo.Ponto"];
            historico?: components["schemas"]["sos.DTOHistorico"][];
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /** @example pane_motor */
            motivo?: components["schemas"]["sos.MotivoSOS"];
            /** @example 4 */
            pessoas_a_bordo?: number;
            /** @description Prestador só aparece preenchido depois do aceite. */
            prestador_id?: string;
            sla_vence_em?: string;
            /** @example notificado */
            status?: components["schemas"]["sos.StatusSOS"];
            /** @example 4min */
            tempo_atraso?: string;
            /** @example 12min */
            tempo_espera?: string;
            /** @example preciso_de_ajuda_urgente */
            urgencia?: components["schemas"]["sos.Urgencia"];
        };
        "sos.DTOEmRisco": {
            /** @example 6 */
            atraso_minutos?: number;
            criado_em?: string;
            geo?: components["schemas"]["geo.Ponto"];
            id?: string;
            motivo?: components["schemas"]["sos.MotivoSOS"];
            sla_vence_em?: string;
            status?: components["schemas"]["sos.StatusSOS"];
            urgencia?: components["schemas"]["sos.Urgencia"];
        };
        "sos.DTOHistorico": {
            ator_id?: string;
            criado_em?: string;
            status_anterior?: string;
            status_novo?: string;
        };
        "sos.DTOProximo": {
            aceito_em?: string;
            atualizado_em?: string;
            concluido_em?: string;
            criado_em?: string;
            /** @example 4,2 */
            distancia_km?: string;
            /**
             * @description EmRisco e os tempos vêm do status EFETIVO calculado na leitura, e não
             *     do worker. Ver Chamado.EmRisco.
             */
            em_risco?: boolean;
            embarcacao_descricao_livre?: string;
            embarcacao_id?: string;
            geo?: components["schemas"]["geo.Ponto"];
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /**
             * @description JaAvisado diz se este prestador já recebeu o aviso. O item continua na
             *     lista — sumir com ele depois da notificação faria o prestador achar que
             *     apareceu do nada quando abrir o app de novo.
             */
            ja_avisado?: boolean;
            /** @example pane_motor */
            motivo?: components["schemas"]["sos.MotivoSOS"];
            /** @example 4 */
            pessoas_a_bordo?: number;
            /** @description Prestador só aparece preenchido depois do aceite. */
            prestador_id?: string;
            sla_vence_em?: string;
            /** @example notificado */
            status?: components["schemas"]["sos.StatusSOS"];
            /** @example 4min */
            tempo_atraso?: string;
            /** @example 12min */
            tempo_espera?: string;
            /** @example preciso_de_ajuda_urgente */
            urgencia?: components["schemas"]["sos.Urgencia"];
        };
        "sos.EntradaCriarChamado": {
            /**
             * @description Etapa 6.
             *     required: true
             *     example: 27999888888
             */
            contato: string;
            /** @description example: Lancha de 6 m de um colega, com marola */
            embarcacao_descricao_livre?: string;
            /**
             * @description Etapa 5. Exatamente UM dos dois: a embarcação cadastrada da pessoa, ou a
             *     descrição livre de uma embarcação de terceiro/alugada.
             */
            embarcacao_id?: string;
            /**
             * @description Etapa 2. Onde exatamente. Ajustável à mão porque o GPS de um celular no
             *     meio do mar é ruim.
             *     required: true
             *     example: -20.3207
             */
            lat: number;
            /**
             * @description required: true
             *     example: -40.3387
             */
            lng: number;
            /**
             * @description Etapa 1. O que está acontecendo.
             *     required: true
             *     example: pane_motor
             */
            motivo: string;
            /**
             * @description Etapa 4.
             *     required: true
             *     example: 4
             */
            pessoas_a_bordo: number;
            /**
             * @description required: true
             *     example: preciso_de_ajuda_urgente
             */
            urgencia: string;
        };
        /** @enum {string} */
        "sos.MotivoSOS": "pane_motor" | "sem_combustivel" | "agua_entrando" | "outro";
        /** @enum {string} */
        "sos.StatusSOS": "aberto" | "notificado" | "aceito" | "concluido" | "cancelado";
        /** @enum {string} */
        "sos.Urgencia": "posso_aguardar" | "preciso_de_ajuda_urgente";
        "usuario.DTO": {
            criado_em?: string;
            /** @example marina.kowalski@exemplo.com */
            email?: string;
            /** @example true */
            email_verificado?: boolean;
            /** @example 3f2504e0-4f89-11d3-9a0c-0305e82c3301 */
            id?: string;
            /** @example Marina Kowalski */
            nome?: string;
            /**
             * @description Papeis traz só os papéis com status ativo. Papel pendente aparece em
             *     /auth/eu, não aqui: quem chama este endpoint quer saber o que a pessoa
             *     pode fazer, não o que ela pediu para poder fazer.
             */
            papeis?: components["schemas"]["usuario.PapelDTO"][];
            /** @example +55 27 99876-5432 */
            telefone?: string;
        };
        /** @enum {string} */
        "usuario.Papel": "cliente" | "proprietario" | "marina" | "prestador" | "admin";
        "usuario.PapelDTO": {
            /** @example Proprietário */
            nome?: string;
            /** @example proprietario */
            papel?: components["schemas"]["usuario.Papel"];
            /** @example ativo */
            status?: components["schemas"]["usuario.StatusPapel"];
        };
        /** @enum {string} */
        "usuario.StatusPapel": "ativo" | "pendente" | "rejeitado";
    };
    responses: never;
    parameters: never;
    requestBodies: {
        /** @description Perfil */
        "prestador.EntradaPrestador": {
            content: {
                "application/json": components["schemas"]["prestador.EntradaPrestador"];
            };
        };
    };
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;

