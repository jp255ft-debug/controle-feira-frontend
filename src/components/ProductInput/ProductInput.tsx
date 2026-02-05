import React, { useState } from 'react';
import { 
  TextField, 
  PrimaryButton, 
  Stack,
  Label,
  Icon
} from '@fluentui/react';

interface ProductInputProps {
  onAddProduct: (name: string, quantity: number, unitPrice: number) => void;
}

const ProductInput: React.FC<ProductInputProps> = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0'); // ALTERADO: De '1' para '0'
  const [unitPrice, setUnitPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !quantity || !unitPrice) {
      alert('Preencha todos os campos!');
      return;
    }

    const qty = parseFloat(quantity);
    const price = parseFloat(unitPrice);

    // ALTERADO: Permitir apenas qty > 0 (não pode ser 0)
    if (qty <= 0 || price < 0) {
      alert('A quantidade deve ser maior que zero e o preço não pode ser negativo!');
      return;
    }

    onAddProduct(name, qty, price);
    
    // ALTERADO: Resetar para 0 ao invés de 1
    setName('');
    setQuantity('0');
    setUnitPrice('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack tokens={{ childrenGap: 15 }}>
        <Label styles={{ root: { fontSize: '18px', fontWeight: 600 } }}>
          <Icon iconName="Add" style={{ marginRight: '8px' }} />
          Adicionar Produto
        </Label>
        
        <TextField
          label="Nome do Produto"
          placeholder="Ex: Arroz, Feijão, Carne..."
          value={name}
          onChange={(_, value) => setName(value || '')}
          required
          styles={{ fieldGroup: { height: '36px' } }}
        />
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <TextField
              label="Quantidade"
              type="number"
              min="0" // ALTERADO: De "0.1" para "0" - permite digitar 0
              step="0.1"
              value={quantity}
              onChange={(_, value) => setQuantity(value || '0')} // ALTERADO: Reset para 0 se vazio
              required
              styles={{ fieldGroup: { height: '36px' } }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              label="Preço Unitário (R$)"
              type="number"
              min="0"
              step="0.01"
              placeholder="0,00"
              value={unitPrice}
              onChange={(_, value) => setUnitPrice(value || '')}
              required
              styles={{ fieldGroup: { height: '36px' } }}
              onRenderPrefix={() => (
                <span style={{ padding: '0 8px', color: '#605e5c' }}>R$</span>
              )}
            />
          </div>
        </div>
        
        <PrimaryButton 
          type="submit"
          text="Adicionar à Lista"
          iconProps={{ iconName: 'AddToShoppingList' }}
          styles={{ root: { height: '36px', marginTop: '10px' } }}
        />
      </Stack>
    </form>
  );
};

export default ProductInput;