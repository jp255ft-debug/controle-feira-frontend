// src/components/FreeLimitWarning.js
import React from 'react';
import './FreeLimitWarning.css';

const FreeLimitWarning = ({ currentCount, maxFree = 10 }) => {
  const percentage = (currentCount / maxFree) * 100;
  const isNearLimit = currentCount >= maxFree * 0.7;
  
  if (!isNearLimit) return null;
  
  return (
    <div className="free-limit-warning">
      <div className="warning-header">
        <span className="warning-icon">⚠️</span>
        <h4>Você está usando {currentCount} de {maxFree} produtos grátis</h4>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      {currentCount >= maxFree ? (
        <div className="warning-message error">
          <p>❌ <strong>Limite atingido!</strong> Faça upgrade para adicionar mais produtos.</p>
          <button className="upgrade-now-btn">
            FAZER UPGRADE AGORA
          </button>
        </div>
      ) : (
        <div className="warning-message">
          <p>Está gostando do app? <strong>Faça upgrade para Premium</strong> e tenha:</p>
          <ul>
            <li>✅ Listas ilimitadas</li>
            <li>✅ Sem anúncios</li>
            <li>✅ Comparador de preços</li>
          </ul>
          <button className="learn-more-btn">
            CONHECER PLANOS PREMIUM
          </button>
        </div>
      )}
    </div>
  );
};

export default FreeLimitWarning;
