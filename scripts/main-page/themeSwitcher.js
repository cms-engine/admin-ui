/**
 * Attaches a click event listener to the theme switcher button to toggle between light and dark themes.
 * The function dynamically updates the theme applied to the document's body and modifies the button's icon
 * and class styling based on the current theme.
 */
const initializeThemeSwitcher = () => {
    const themeSwitcher = document.getElementById('themeSwitcher')
    const body = document.body
    const savedTheme = localStorage.getItem('theme') || 'light'
    const themeIcon = themeSwitcher.querySelector('i')

    if (savedTheme === 'dark') {
        body.classList.add('dark-theme')
        themeIcon.classList.replace('bi-moon', 'bi-sun')
    } else {
        body.classList.remove('dark-theme')
        themeIcon.classList.replace('bi-sun', 'bi-moon')
    }

    themeSwitcher.addEventListener('click', () => {
        const isDarkTheme = body.classList.toggle('dark-theme')
        if (isDarkTheme) {
            themeIcon.classList.replace('bi-moon', 'bi-sun')
            localStorage.setItem('theme', 'dark')
        } else {
            themeIcon.classList.replace('bi-sun', 'bi-moon')
            localStorage.setItem('theme', 'light')
        }
    })
}

initializeThemeSwitcher()
