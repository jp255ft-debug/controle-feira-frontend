import React from 'react';
import { 
  DetailsList, 
  DetailsListLayoutMode, 
  SelectionMode,
  IColumn,
  IconButton,
  Stack,
  Text
} from '@fluentui/react';
import { Product } from '../../types';

interface ReceiptViewProps {
  products: Product[];
  onRemoveProduct: (id: string) => void;
  total: number;
}

const ReceiptView: React.FC<ReceiptViewProps> = ({ products, onRemoveProduct, total }) => {
  const columns: IColumn[] = [
    {
      key: 'name',
      name: 'Produto',
      fieldName: 'name',
      minWidth: 150,
      maxWidth: 250
    },
    {
      key: 'quantity',
      name: 'Qtd',
      fieldName: 'quantity',
      minWidth: 60,
      maxWidth: 80,
      onRender: (item: Product) => item.quantity.toFixed(2)
    },
    {
      key: 'unitPrice',
      name: 'Preço Un.',
      fieldName: 'unitPrice',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: Product) => `R$ ${item.unitPrice.toFixed(2)}`
    },
    {
      key: 'total',
      name: 'Total',
      fieldName: 'total',
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: Product) => (
        <Text variant="mediumPlus" styles={{ root: { fontWeight: 600 } }}>
          R$ {item.total.toFixed(2)}
        </Text>
      )
    },
    {
      key: 'actions',
      name: '',
      minWidth: 40,
      maxWidth: 40,
      onRender: (item: Product) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          title="Remover"
          ariaLabel="Remover produto"
          onClick={() => onRemoveProduct(item.id)}
          styles={{ root: { color: '#a4262c' } }}
        />
      )
    }
  ];

  if (products.length === 0) {
    return (
      <Stack 
        horizontalAlign="center" 
        verticalAlign="center" 
        style={{ height: '200px', border: '2px dashed #edebe9', borderRadius: '4px' }}
      >
        <IconButton
          iconProps={{ iconName: 'AddToShoppingList', style: { fontSize: '48px', color: '#605e5c' } }}
          disabled
        />
        <Text variant="medium" styles={{ root: { color: '#605e5c', marginTop: '10px' } }}>
          Adicione produtos para começar sua lista de feira
        </Text>
      </Stack>
    );
  }

  return (
    <Stack tokens={{ childrenGap: 15 }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
        📋 Lista de Produtos ({products.length} itens)
      </Text>
      
      <div style={{ 
        border: '1px solid #edebe9', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <DetailsList
          items={products}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          compact
        />
      </div>

      <div style={{ 
        backgroundColor: '#faf9f8', 
        padding: '16px', 
        borderRadius: '4px',
        border: '1px solid #edebe9'
      }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
            Total da Compra:
          </Text>
          <Stack horizontal verticalAlign="baseline" tokens={{ childrenGap: 4 }}>
            <Text variant="medium" styles={{ root: { color: '#605e5c' } }}>R$</Text>
            <Text variant="xxLarge" styles={{ root: { fontWeight: 700, color: '#0078d4' } }}>
              {total.toFixed(2)}
            </Text>
          </Stack>
        </Stack>
      </div>
    </Stack>
  );
};

export default ReceiptView;
