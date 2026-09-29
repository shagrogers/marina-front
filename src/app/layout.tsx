import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';

import './globals.css';
import './tailwind.css';

import { ProvedorSessao } from '@/lib/sessao/ProvedorSessao';

/**
 * Outfit.
 *
 * ## Por que NÃO Inter, Roboto, Arial ou system
 *
 * A doc 1 §3 é uma tela escura com números grandes e rótulos em caixa alta —
 * o registro é de instrumento de painel, e Inter/Roboto são a fonte de
 * dashboard corporativo: neutras, com vergonha nos números. Outfit tem
 * geométrica, tem contraste alto no escuro e os algarismos thick que seguram
 * `--tamanho-metrica` sem parecer fino.
 *
 * E `system` nunca entra como principal: a fonte do sistema muda por SO, e a
 * mesma tela ficaria diferente na máquina de quem projetou e na de quem usa.
 */
const fonte = Outfit({
  subsets: ['latin'],
  variable: '--fonte-outfit',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'BOATS — plataforma náutica',
    template: '%s · BOATS',
  },
  description: 'Aluguel de lancha, vagas de marina e socorro náutico.',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0c',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fonte.variable}>
      <body className="min-h-dvh antialiased">
        <ProvedorSessao>{children}</ProvedorSessao>
      </body>
    </html>
  );
}
