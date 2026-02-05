import React from 'react';
import './UpgradeButton.css';

const UpgradeButton = () => {
  const handleUpgradeClick = () => {
    // Redirecionar para página de assinatura
    window.location.href = '/#/pricing';
    
    // Ou abrir modal
    // setShowPricingModal(true);
  };

  return (
    <button 
      className="upgrade-button"
      onClick={handleUpgradeClick}
    >
      <span className="upgrade-icon">⭐</span>
      <span className="upgrade-text">UPGRADE PARA PREMIUM</span>
      <span className="upgrade-badge">R$ 9,90/mês</span>
    </button>
  );
};

export default UpgradeButton;
