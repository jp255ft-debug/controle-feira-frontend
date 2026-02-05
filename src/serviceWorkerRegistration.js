
// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registrado com sucesso: ', registration);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
