// C:\Source\Repos\ControleFeira\frontend\src\brands\precobom.js
const brandConfig = {
  id: 'precobom',
  nome: 'Supermercado Preço Bom',
  slogan: 'Economia que faz bem!',
  
  // Cores personalizadas
  cores: {
    primaria: '#FF6B00',     // Laranja
    secundaria: '#2E7D32',   // Verde
    fundo: '#f8f9fa',
    texto: '#333333',
    borda: '#dee2e6'
  },
  
  // Logos
  logo: {
    url: '/brands/precobom/logo.png',
    altura: '50px'
  },
  
  // Contatos
  contato: {
    whatsapp: '5511999999999',
    email: 'contato@precobom.com.br'
  },
  
  // Metadados
  meta: {
    titulo: 'Controle de Feira - Preço Bom',
    descricao: 'Planejador de compras do Supermercado Preço Bom'
  },
  
  // Configurações específicas
  configuracoes: {
    orcamentoPadrao: 500,
    moeda: 'R$',
    capturarWhatsApp: true,
    capturarEmail: false
  }
};

export default brandConfig;