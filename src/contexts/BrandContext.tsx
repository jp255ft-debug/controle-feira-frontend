import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrandConfig } from '../types';

// Configuração padrão
const defaultBrand: BrandConfig = {
  id: 'default',
  nome: 'Controle de Feira',
  slogan: 'Não estoure seu orçamento!',
  cores: {
    primaria: '#0078d4',
    secundaria: '#107c10',
    fundo: '#f3f2f1',
    texto: '#323130'
  },
  configuracoes: {
    orcamentoPadrao: 500,
    moeda: 'R$'
  },
  contato: {
    whatsapp: '5511999999999',
    email: 'contato@exemplo.com'
  }
};

interface BrandContextType {
  brand: BrandConfig;
  updateBrand: (newBrand: Partial<BrandConfig>) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brand, setBrand] = useState<BrandConfig>(defaultBrand);

  useEffect(() => {
    // Aplica as cores da marca no CSS
    const root = document.documentElement;
    root.style.setProperty('--win-primary', brand.cores.primaria);
    root.style.setProperty('--win-bg', brand.cores.fundo);
    root.style.setProperty('--win-text', brand.cores.texto);
    
    // Atualiza o título da página
    document.title = `${brand.nome} - Controle de Feira`;
  }, [brand]);

  const updateBrand = (newBrand: Partial<BrandConfig>) => {
    setBrand(prev => ({ ...prev, ...newBrand }));
  };

  return (
    <BrandContext.Provider value={{ brand, updateBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand deve ser usado dentro de BrandProvider');
  }
  return context;
};

export type { BrandConfig };
