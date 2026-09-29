'use client';

import { useRouter } from 'next/navigation';

import { Botao } from '../ui/Botao';
import { Flutuante } from './TabBar';

type Props = {
  /** Abre o wizard de SOS. A navegação vem no passo 8, quando o wizard existir;
   * por enquanto o botão só mostra que a rota ainda não foi construída. */
  aoAbrir?: () => void;
  rotulo?: string;
};

/**
 * Botão de Socorro.
 *
 * ## Texto, não só ícone
 *
 * Um botão vermelho com um ícone de "+" ou "!": a pessoa que está com o motor
 * pifado e o dedo molhado precisa ler "SOCORRO" antes de tocar, e o ícone não
 * garante isso. O texto é o que torna a decisão óbvia sob stress.
 *
 * ## É o único vermelho da aplicação
 *
 * Fora do eixo SOS, vermelho é `--erro`, que é um vermelho frio. Se o botão de
 * SOS e o de "excluir embarcação" fossem do mesmo vermelho, o segundo treinaria
 * o dedo a apertar o primeiro.
 */
export function BotaoSocorro({ aoAbrir, rotulo = 'Socorro' }: Props) {
  const router = useRouter();

  return (
    <Flutuante>
      <Botao
        variante="sos"
        tamanho="lg"
        className="pulso-sos rounded-[var(--raio-cheio)] px-8"
        onClick={() => {
          if (aoAbrir !== undefined) {
            aoAbrir();
            return;
          }
          router.push('/sos');
        }}
      >
        <span aria-hidden="true">⚑</span>
        {rotulo}
      </Botao>
    </Flutuante>
  );
}
