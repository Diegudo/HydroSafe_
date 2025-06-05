// ...existing code...
const themeBtn = document.querySelector('.theme-switcher-btn');
let currentTheme = 'light';

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.backgroundColor = "#2c3e50"; // azul escuro
    } else {
        document.body.style.backgroundColor = "#ecf0f1"; // branco padrão
    }
    document.body.setAttribute('data-theme', theme);
    if (themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else if (theme === 'blue') {
            icon.classList.replace('fa-sun', 'fa-droplet');
        } else {
            icon.classList.replace('fa-droplet', 'fa-moon');
        }
    }
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const themes = ['light', 'dark', 'blue'];
    currentTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
    applyTheme(currentTheme);
}
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    currentTheme = savedTheme;
}
applyTheme(currentTheme);
if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
}
// ...existing code...