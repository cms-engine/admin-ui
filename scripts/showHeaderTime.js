/**
 * Updates the current time displayed in the HTML element with the id "currentTime".
 * The time is formatted to display hours, minutes, and seconds in a 2-digit format.
 * This function is called every second using `setInterval` and once initially.
 */
// Updates the time displayed on the page
export const initializeHeaderTime = () => {
    const updateTime = () => {
        const timeElement = document.getElementById("currentTime");
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = formattedTime;
    };

    setInterval(updateTime, 1000); // Update every second
    updateTime(); // Initial call
};