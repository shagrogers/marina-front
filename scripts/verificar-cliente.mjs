// verificar-cliente.mjs — falha se o cliente gerado divergir do contrato.
//
// Por que isso roda no `verify`: o arquivo gerado é versionado, e um arquivo
// versionado que ninguém regenera vira mentira. O tipo "verifica" a resposta do
// login, o contrato mudou, e o próximo `npm run verificar` acusa antes de o
// tipo errado chegar à tela.
//
// A verificação é PURA: gera em memória e compara, sem escrever. Um `verify`
// que altera o repositório é pior do que não verificar — o diff apareceria
// junto da mensagem de erro, e a próxima checagem "passaria" por ter escrito o
// que deveria comparar.
//
// Uso: node scripts/verificar-cliente.mjs
import { readFile } from 'node:fs/promises';

import { CONTRATO, DESTINO, contratoRelativo, textoGerado } from './gerar-cliente.mjs';

async function main() {
  const versionado = await readFile(DESTINO, 'utf8').catch((erro) => {
    if (erro && erro.code === 'ENOENT') {
      process.stderr.write(
        'cliente ausente: src/lib/api/esquema.ts\n' +
          'Rode `npm run api:gerar` e versione o resultado.\n',
      );
      process.exit(1);
    }
    throw erro;
  });

  // A leitura do contrato acontece dentro de textoGerado; um contrato ausente
  // estoura ali com o caminho do arquivo, e não com "cliente divergente" — que
  // mandaria a pessoa regenerar o cliente por um problema que é outro.
  const esperado = await textoGerado();

  if (versionado !== esperado) {
    process.stderr.write(
      `cliente DIVERGENTE de ${contratoRelativo()}\n` +
        'O contrato mudou e o cliente não foi regenerado.\n' +
        'Rode `npm run api:gerar` e versione o resultado.\n',
    );
    process.exit(1);
  }

  // Confere que o contrato existe, para a mensagem acima nunca ser a
  // explicação errada.
  await readFile(CONTRATO, 'utf8');

  process.stdout.write(
    `cliente em dia com ${contratoRelativo()} (${esperado.split('\n').length} linhas)\n`,
  );
}

await main();
