// Simple visitor counter using localStorage as fallback
(function() {
  const el = document.getElementById('visitor-counter');
  if (!el) return;
  
  // Solo usamos localStorage para evitar errores de red
  let count = parseInt(localStorage.getItem('visitor-counter') || '0', 10) + 1;
  localStorage.setItem('visitor-counter', count);
  el.textContent = count + '+';
  
  // Intento opcional de usar un servicio externo, si funciona
  try {
    const cacheBuster = new Date().getTime();
    fetch(`https://api.countapi.xyz/hit/regressions-demo/main-page?${cacheBuster}`, { 
      mode: 'no-cors',  // Intenta con no-cors para evitar errores CORS
      cache: 'no-cache'
    })
    .then(r => {
      // Solo actualizamos UI si funciona
      if (r.ok && r.status === 200) {
        r.json().then(data => {
          if (data && data.value) {
            el.textContent = data.value;
          }
        });
      }
    })
    .catch(() => {
      // Silenciamos errores, ya estamos usando localStorage como fallback
    });
  } catch(e) {
    // Silenciamos errores
  }
})();
