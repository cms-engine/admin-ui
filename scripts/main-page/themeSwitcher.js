/**
 * Attaches a click event listener to the theme switcher button to toggle between light and dark themes.
 * The function dynamically updates the theme applied to the document's body and modifies the button's icon
 * and class styling based on the current theme.
 */

export const initializeThemeSwitcher = () => {
    const themeSwitcher = document.getElementById("themeSwitcher");
    themeSwitcher.addEventListener("click", () => {
        const body = document.body;
        body.classList.toggle("light-theme");
        body.classList.toggle("dark-theme");

        const icon = themeSwitcher.querySelector("i");

        if (body.classList.contains("light-theme")) {
            icon.classList.remove("bi-moon");
            icon.classList.add("bi-sun");
            themeSwitcher.classList.replace("btn-outline-light", "btn-outline-dark");
        } else {
            icon.classList.remove("bi-sun");
            icon.classList.add("bi-moon");
            themeSwitcher.classList.replace("btn-outline-dark", "btn-outline-light");
        }
    });
};
