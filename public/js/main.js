const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const themeToggle = document.getElementById('themeToggle');

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });
}
