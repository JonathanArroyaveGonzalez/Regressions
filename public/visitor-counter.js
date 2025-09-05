// Simple visitor counter usando solo localStorage
(function() {
  const el = document.getElementById('visitor-counter');
  if (!el) return;
  
  // Usar solo localStorage, más confiable
  let count = parseInt(localStorage.getItem('visitor-counter') || '0', 10) + 1;
  localStorage.setItem('visitor-counter', count);
  el.textContent = count + '+';
})();
