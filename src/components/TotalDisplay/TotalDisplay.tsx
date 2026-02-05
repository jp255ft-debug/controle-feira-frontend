import React, { useState } from 'react';
import { 
  ProgressIndicator, 
  Text, 
  Stack,
  TextField,
  DefaultButton,
  MessageBar,
  MessageBarType
} from '@fluentui/react';

interface TotalDisplayProps {
  total: number;
  budget: number;
  onBudgetChange: (budget: number) => void;
  primaryColor: string; // Propriedade adicionada aqui
}

const TotalDisplay: React.FC<TotalDisplayProps> = ({ 
  total, 
  budget, 
  onBudgetChange, 
  primaryColor // Recebe a prop
}) => {
  const [editBudget, setEditBudget] = useState(false);
  const [tempBudget, setTempBudget] = useState(budget.toString());

  const percentage = (total / budget) * 100;
  const remaining = budget - total;
  const isOverBudget = total > budget;

  const handleSaveBudget = () => {
    const newBudget = parseFloat(tempBudget);
    if (!isNaN(newBudget) && newBudget >= 0) {
      onBudgetChange(newBudget);
      setEditBudget(false);
    }
  };

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
        💰 Controle de Orçamento
      </Text>

      {/* Configuração de orçamento */}
      <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 10 }}>
        {editBudget ? (
          <>
            <TextField
              label="Definir Orçamento"
              type="number"
              min="0"
              step="10"
              value={tempBudget}
              onChange={(_, value) => setTempBudget(value || '0')}
              styles={{ root: { flex: 1 }, fieldGroup: { height: '32px' } }}
            />
            <DefaultButton
              text="Salvar"
              onClick={handleSaveBudget}
              styles={{ root: { height: '32px' } }}
            />
            <DefaultButton
              text="Cancelar"
              onClick={() => {
                setEditBudget(false);
                setTempBudget(budget.toString());
              }}
              styles={{ root: { height: '32px' } }}
            />
          </>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              <Text variant="medium">Orçamento Disponível:</Text>
              <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: primaryColor } }}>
                R$ {budget.toFixed(2)}
              </Text>
            </div>
            <DefaultButton
              text="Alterar"
              onClick={() => setEditBudget(true)}
              styles={{ root: { height: '32px' } }}
            />
          </>
        )}
      </Stack>

      {/* Barra de progresso */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <Text variant="small">Gasto: R$ {total.toFixed(2)}</Text>
          <Text variant="small">Restante: R$ {Math.max(0, remaining).toFixed(2)}</Text>
        </div>
        <ProgressIndicator
          percentComplete={percentage / 100}
          barHeight={8}
          styles={{
            root: { marginBottom: '10px' },
            itemProgress: {
              padding: 0,
              backgroundColor: isOverBudget ? '#d13438' : 
                percentage > 80 ? '#ffaa44' : '#107c10'
            }
          }}
        />
      </div>

      {/* Mensagens de status */}
      {isOverBudget ? (
        <MessageBar messageBarType={MessageBarType.error}>
          ❌ Orçamento excedido em R$ {(total - budget).toFixed(2)}
        </MessageBar>
      ) : percentage > 80 ? (
        <MessageBar messageBarType={MessageBarType.warning}>
          ⚠️ Cuidado! Você já gastou {percentage.toFixed(0)}% do orçamento
        </MessageBar>
      ) : (
        <MessageBar messageBarType={MessageBarType.success}>
          ✅ Dentro do orçamento! Ainda pode gastar R$ {remaining.toFixed(2)}
        </MessageBar>
      )}

      {/* Resumo rápido */}
      <Stack horizontal tokens={{ childrenGap: 20 }} style={{ marginTop: '10px' }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <Text variant="smallPlus">Total Gasto</Text>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
            R$ {total.toFixed(2)}
          </Text>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <Text variant="smallPlus">Produtos</Text>
          <Text variant="xLarge" styles={{ root: { fontWeight: 600 } }}>
            {Math.floor(total / budget * 100)}%
          </Text>
        </div>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <Text variant="smallPlus">Status</Text>
          <Text variant="medium" styles={{ 
            root: { 
              fontWeight: 600,
              color: isOverBudget ? '#d13438' : 
                percentage > 80 ? '#ffaa44' : '#107c10'
            } 
          }}>
            {isOverBudget ? 'EXCEDIDO' : percentage > 80 ? 'ATENÇÃO' : 'OK'}
          </Text>
        </div>
      </Stack>
    </Stack>
  );
};

export default TotalDisplay;
