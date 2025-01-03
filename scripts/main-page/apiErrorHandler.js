/**
 * Displays a toast message on the screen.
 *
 * @param {string} message - The message to display in the toast.
 */
export const showToast = (message) => {
    const toastContainer = document.getElementById('toast-container') || (() => {
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        return container;
    })();

    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-danger border-0 show';
    toast.role = 'alert';
    toast.ariaLive = 'assertive';
    toast.ariaAtomic = 'true';
    toast.style.minWidth = '250px';
    toast.style.marginBottom = '0.5rem';
    toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 5000);
};

/**
 * Handles API response errors.
 *
 * @param {string} url - The URL to fetch.
 * @param {object} [options] - Fetch options like method, headers, and body.
 * @returns {Promise<any>} - Returns the response data as JSON if the request was successful.
 * @throws Will throw an error if the response is not ok, showing a toast with the error message.
 */
const fetchWithErrorHandling = async (url, options) => {
    const response = await fetch(url, options) // Wait for the fetch to resolve

    // Return the resolved JSON data if successful
    if (response.ok) {
        return response.json()
    }

    const errorResponse = await response.json().catch(() => ({})) // Handle non-JSON error responses
    const errorMessage = errorResponse?.message || `Error ${response.status}: ${response.statusText}`

    // Display the error message in the toast
    showToast(errorMessage)
    throw new Error(errorMessage)
}

export {fetchWithErrorHandling}
