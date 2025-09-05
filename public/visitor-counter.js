// Simple visitor counter using localStorage as fallback and a public API for real counts
// This script fetches and updates a counter from a free API (countapi.xyz)
(function() {
  const el = document.getElementById('visitor-counter');
  if (!el) return;
  const NAMESPACE = 'regressions-demo'; // Puedes cambiarlo por algo único
  const KEY = 'main-page';
  const API = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

  fetch(API)
    .then(r => r.json())
    .then(data => {
      el.textContent = data.value;
    })
    .catch(() => {
      // fallback: localStorage
      let count = parseInt(localStorage.getItem('visitor-counter') || '0', 10) + 1;
      localStorage.setItem('visitor-counter', count);
      el.textContent = count + '+';
    });
})();
