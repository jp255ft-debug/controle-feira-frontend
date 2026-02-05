// Tipos compartilhados entre todos os componentes
export interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface BrandConfig {
  id: string;
  nome: string;
  slogan: string;
  cores: {
    primaria: string;
    secundaria: string;
    fundo: string;
    texto: string;
  };
  configuracoes?: {
    orcamentoPadrao?: number;
    moeda?: string;
  };
  contato: {
    whatsapp: string;
    email: string;
  };
}
