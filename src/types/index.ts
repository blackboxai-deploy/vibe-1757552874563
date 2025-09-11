// TypeScript interfaces for Pipocando Festas e Eventos System

export interface Cliente {
  id: string;
  // Dados Pessoais
  nomeCompleto: string;
  nome: string; // compatibilidade
  cpfCnpj: string;
  rg: string;
  numeroCelular: string;
  telefone: string; // compatibilidade
  enderecoResidencia: string;
  endereco: string; // compatibilidade
  email: string;
  
  // Local da Festa
  enderecoFesta: string;
  blocoApartamento: string;
  nomeCondominio: string;
  bairroFesta: string;
  moraNoLocal: boolean;
  responsavelLocal?: string;
  pontoReferencia: string;
  
  // Data e Horário
  data: string;
  diaSemana: string;
  inicioFesta: string;
  finalFesta: string;
  horarioFesta: string; // compatibilidade
  
  // Marketing
  comoConheceu: string;
  instagram: string;
  
  // Aniversariante
  nomeAniversariante: string;
  idadeAniversariante: number;
  temaFesta: string;
  
  // Tipo de Serviço/Pacote
  descricaoCompletaPacote: string;
  
  // Convidados
  numeroCriancasPrevisto: number;
  idadeCriancas: string;
  numeroConvidadosPrevisto: number;
  restricoesGeneroMusical: string;
  
  // Sistema
  totalEventos: number;
  dataUltimoEvento?: string;
}

export interface Evento {
  id: string;
  clienteId: string;
  nomeCliente: string;
  data: string;
  horario: string;
  endereco: string;
  quantidadeCriancas: number;
  servicos: string[];
  status: 'planejado' | 'andamento' | 'concluido' | 'cancelado';
  equipeAlocada: string[];
  materiaisAlocados: string[];
  valor: number;
  observacoes?: string;
}

export interface Funcionario {
  id: string;
  nome: string;
  cargo: string;
  telefone: string;
  email: string;
  especialidades: string[];
  salario: number;
  disponivel: boolean;
}

export interface Material {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeEmUso: number;
  valorUnitario: number;
  observacoes?: string;
}

export interface Transacao {
  id: string;
  tipo: 'receita' | 'despesa';
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  eventoId?: string;
  formaPagamento: string;
}

export interface SystemContextType {
  clientes: Cliente[];
  setClientes: (clientes: Cliente[]) => void;
  eventos: Evento[];
  setEventos: (eventos: Evento[]) => void;
  funcionarios: Funcionario[];
  setFuncionarios: (funcionarios: Funcionario[]) => void;
  materiais: Material[];
  setMateriais: (materiais: Material[]) => void;
  transacoes: Transacao[];
  setTransacoes: (transacoes: Transacao[]) => void;
}