import React, { useState } from 'react';
import { 
  TextField, 
  PrimaryButton, 
  DefaultButton,
  Stack,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize
} from '@fluentui/react';
import { Product } from '../../types';
import { BrandConfig } from '../../contexts/BrandContext';

interface LeadCaptureProps {
  brand: BrandConfig;
  products: Product[];
  total: number;
  onClose: () => void;
}

const LeadCapture: React.FC<LeadCaptureProps> = ({ 
  brand, 
  products, 
  total, 
  onClose 
}) => {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formatarListaParaTexto = () => {
    let texto = `*LISTA DE COMPRAS - ${brand.nome.toUpperCase()}*\n\n`;
    products.forEach((produto, index) => {
      texto += `${index + 1}. ${produto.name} - ${produto.quantity} x ${brand.configuracoes?.moeda || 'R$'}${produto.unitPrice.toFixed(2)} = ${brand.configuracoes?.moeda || 'R$'}${produto.total.toFixed(2)}\n`;
    });
    texto += `\n*TOTAL: ${brand.configuracoes?.moeda || 'R$'}${total.toFixed(2)}*`;
    return texto;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      setError('Por favor, informe seu nome');
      return;
    }

    if (!whatsapp.trim() && !email.trim()) {
      setError('Informe pelo menos WhatsApp ou E-mail');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const leadData = {
        nome,
        whatsapp: whatsapp.replace(/\D/g, ''), // Remove não-números
        email,
        produtoCount: products.length,
        total: total.toFixed(2),
        produtos: JSON.stringify(products),
        listaTexto: formatarListaParaTexto(),
        marca: brand.id,
        supermercado: brand.nome,
        data: new Date().toISOString()
      };

      console.log('📝 Salvando lead:', leadData);
      
      // Salva no localStorage (para teste)
      const existingLeads = JSON.parse(localStorage.getItem('controleFeira_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('controleFeira_leads', JSON.stringify(existingLeads));
      
      // Simula envio para servidor
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Fecha automaticamente após 3 segundos
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (err) {
      setError('Erro ao salvar. Tente novamente.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '500px',
        width: '90%'
      }}>
        <MessageBar messageBarType={MessageBarType.success}>
          ✅ Lista salva com sucesso!
        </MessageBar>
        <div style={{ marginTop: '20px' }}>
          <p><strong>Obrigado, {nome}!</strong></p>
          <p>Sua lista foi salva e em breve você receberá ofertas do {brand.nome}.</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
            Esta janela fechará automaticamente...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      maxWidth: '500px',
      width: '90%'
    }}>
      <h2 style={{ 
        marginTop: 0, 
        color: brand.cores.primaria,
        borderBottom: `2px solid ${brand.cores.primaria}`,
        paddingBottom: '10px'
      }}>
        💾 Salvar sua lista
      </h2>
      
      <p>
        Salve sua lista de <strong>{products.length}</strong> itens e receba ofertas do <strong>{brand.nome}</strong>!
      </p>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>
          Você irá receber:
        </p>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Sua lista com {products.length} itens</li>
          <li>Total: {brand.configuracoes?.moeda || 'R$'}{total.toFixed(2)}</li>
          <li>Ofertas personalizadas do {brand.nome}</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <Stack tokens={{ childrenGap: 15 }}>
          <TextField
            label="Seu nome"
            value={nome}
            onChange={(_, value) => setNome(value || '')}
            required
            disabled={isSubmitting}
          />

          <TextField
            label="WhatsApp (com DDD)"
            placeholder="(11) 99999-9999"
            value={whatsapp}
            onChange={(_, value) => setWhatsapp(value || '')}
            disabled={isSubmitting}
          />

          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(_, value) => setEmail(value || '')}
            disabled={isSubmitting}
          />

          {error && (
            <MessageBar messageBarType={MessageBarType.error}>
              {error}
            </MessageBar>
          )}

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <DefaultButton
              text="Cancelar"
              onClick={onClose}
              disabled={isSubmitting}
            />
            <PrimaryButton
              type="submit"
              text={isSubmitting ? "Salvando..." : "Salvar Lista"}
              disabled={isSubmitting}
              styles={{ 
                root: { 
                  backgroundColor: brand.cores.primaria,
                  minWidth: '150px'
                } 
              }}
            />
          </div>
          
          {isSubmitting && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <Spinner size={SpinnerSize.small} label="Salvando..." />
            </div>
          )}
        </Stack>
      </form>
    </div>
  );
};

export default LeadCapture;
