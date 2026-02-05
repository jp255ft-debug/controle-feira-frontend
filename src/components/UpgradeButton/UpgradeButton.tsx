import React from 'react';
import { PrimaryButton } from '@fluentui/react';

const UpgradeButton: React.FC = () => {
  const handleClick = () => {
    alert('⭐ Página de vendas em desenvolvimento! Em breve você poderá fazer upgrade para a versão Premium.');
  };

  return (
    <PrimaryButton
      onClick={handleClick}
      styles={{
        root: {
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
          border: 'none',
          borderRadius: '25px',
          padding: '12px 24px',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
        },
        rootHovered: {
          background: 'linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(255, 107, 107, 0.4)'
        }
      }}
    >
      ⭐ UPGRADE PARA PREMIUM
    </PrimaryButton>
  );
};

export default UpgradeButton;
