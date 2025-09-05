// Utilidad para alternar el tema claro/oscuro
document.addEventListener('DOMContentLoaded', function () {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;
  themeBtn.addEventListener('click', function () {
    const html = document.documentElement;
    const welcomeImg = document.querySelector('#text-welcome img');
    if (html.classList.contains('light-theme')) {
      html.classList.remove('light-theme');
      html.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
      if (welcomeImg) {
        welcomeImg.src = welcomeImg.src.replace('color=000000', 'color=F3F7E7AC');
      }
    } else {
      html.classList.remove('dark-theme');
      html.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
      if (welcomeImg) {
        welcomeImg.src = welcomeImg.src.replace('color=F3F7E7AC', 'color=000000');
      }
    }
  });
  // Cargar preferencia guardada
  const saved = localStorage.getItem('theme');
  const welcomeImg = document.querySelector('#text-welcome img');
  if (saved === 'light') {
    document.documentElement.classList.add('light-theme');
    if (welcomeImg) {
      welcomeImg.src = welcomeImg.src.replace('color=F3F7E7AC', 'color=000000');
    }
  } else {
    document.documentElement.classList.add('dark-theme');
    if (welcomeImg) {
      welcomeImg.src = welcomeImg.src.replace('color=000000', 'color=F3F7E7AC');
    }
  }
});
