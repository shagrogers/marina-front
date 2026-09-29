import { cx } from './classe';

/**
 * Tom da tag. Cada um tem uma COR com um SIGNIFICADO, e a lista é fechada.
 *
 * `verificada` e `aceito` são lilás porque "a plataforma confirmou" é a mesma
 * família de informação: verificação. `alerta` é dourado; `sos` é o único
 * vermelho, e existe para o eixo de socorro.
 *
 * Erro de formulário NÃO tem tom aqui: quem mostra erro é o `Campo`, com
 * `--erro`. Uma tag de erro em vermelho de SOS faria o usuário achar que a
 * plataforma está em emergência.
 */
export type Tom = 'neutro' | 'verificada' | 'aceito' | 'alerta' | 'sos' | 'sucesso';

const TONS: Record<Tom, string> = {
  neutro: 'bg-[var(--superficie-alta)] text-[var(--texto-secundario)]',
  verificada: 'bg-[var(--lilas-sutil)] text-[var(--lilas)] border border-[var(--lilas-contorno)]',
  aceito: 'bg-[var(--lilas-sutil)] text-[var(--lilas)] border border-[var(--lilas-contorno)]',
  alerta: 'bg-[var(--dourado-sutil)] text-[var(--dourado)] border border-[var(--dourado-contorno)]',
  sos: 'bg-[var(--sos-sutil)] text-[var(--sos)] border border-[var(--sos-contorno)]',
  sucesso: 'bg-[var(--sucesso-sutil)] text-[var(--sucesso)]',
};

type Props = {
  children: React.ReactNode;
  tom?: Tom;
  className?: string;
};

export function Tag({ children, tom = 'neutro', className }: Props) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-[var(--raio-cheio)] px-2.5 py-1',
        'text-[var(--tamanho-rotulo)] uppercase tracking-[var(--tracking-rotulo)]',
        'font-[var(--peso-medio)] whitespace-nowrap',
        TONS[tom],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Mapeia status de reserva, SOS, diária e embarcação para o tom.
 *
 * Uma tabela, e não `switch` espalhado: quem chega com um status novo
 * descobre aqui que há um lugar para ele, e não descobre quando a tela mostrar
 * cinza onde deveria lilás.
 */
const TOM_POR_STATUS: Record<string, Tom> = {
  aceito: 'aceito',
  confirmada: 'aceito',
  concluida: 'sucesso',
  verificada: 'verificada',
  ativa: 'sucesso',
  livre: 'sucesso',
  notificado: 'alerta',
  aguardando_marina: 'alerta',
  solicitada: 'alerta',
  aberto: 'alerta',
  pendente_verificacao: 'alerta',
  pendente: 'alerta',
  ocupada: 'alerta',
  expirada: 'neutro',
  recusada: 'neutro',
  cancelada: 'neutro',
  manutencao: 'neutro',
  reprovada: 'neutro',
  rejeitada: 'neutro',
  disponivel: 'neutro',
  pendente_externo: 'alerta',
  confirmado_externo: 'sucesso',
};

export function tomDeStatus(status: string): Tom {
  return TOM_POR_STATUS[status] ?? 'neutro';
}

/** Rótulo legível de um status, com a capitalização que a doc 1 usa. */
const ROTULO: Record<string, string> = {
  aguardando_marina: 'Aguardando marina',
  pendente_verificacao: 'Pendente',
  pendente_externo: 'Pagamento pendente',
  confirmado_externo: 'Pago',
  so_skipper: 'Só skipper',
  com_marinheiro: 'Com marinheiro',
  sem_tripulacao: 'Sem tripulação',
  precisa_de_ajuda_urgente: 'Urgente',
  posso_aguardar: 'Pode aguardar',
  sem_combustivel: 'Sem combustível',
  agua_entrando: 'Água entrando',
  pane_motor: 'Pane de motor',
};

export function rotuloDeStatus(status: string): string {
  const pronto = ROTULO[status];
  if (pronto !== undefined) {
    return pronto;
  }
  return status.charAt(0).toUpperCase() + status.slice(1).replaceAll('_', ' ');
}
