
const html = document.documentElement;

// Function to apply and save the theme
function applyTheme(theme) {
html.setAttribute('data-theme', theme);
localStorage.setItem('theme', theme);
}

// Initial Theme Setup (runs immediately)
(function initTheme() {
const savedTheme = localStorage.getItem('theme');
let initialTheme;

if (savedTheme) {
    initialTheme = savedTheme; // Use saved choice
} else {
    // Fallback to system preference (using your theme names)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    initialTheme = prefersDark ? 'dark' : 'emerald';
}

applyTheme(initialTheme); // Apply theme

// Manual Theme Controller Setup (runs after DOM loads)
document.addEventListener("DOMContentLoaded", function() {
    const themeController = document.querySelector('.theme-controller');
    
    // Sync the toggle state with the initial theme
    themeController.checked = initialTheme === 'dark'; 

    themeController.addEventListener('change', function() {
    const newScheme = themeController.checked ? 'dark' : 'emerald';
    applyTheme(newScheme); // Apply and save the new choice
    });
});
})();
