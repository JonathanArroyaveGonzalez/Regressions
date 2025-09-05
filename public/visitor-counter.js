// Global visitor counter using a public API for real counts
// This script fetches and updates a counter from a free API (countapi.xyz)
(function() {
  const el = document.getElementById('visitor-counter');
  if (!el) return;
  
  const NAMESPACE = 'regressions-demo'; // Unique namespace for this app
  const KEY = 'main-page';
  const API = `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

  // Show loading state
  el.textContent = '...';

  fetch(API)
    .then(r => r.json())
    .then(data => {
      el.textContent = data.value;
    })
    .catch(() => {
      // fallback: localStorage
      let count = parseInt(localStorage.getItem('visitor-counter') || '0', 10) + 1;
      localStorage.setItem('visitor-counter', count);
      el.textContent = count + ' (local)';
    });
})();
