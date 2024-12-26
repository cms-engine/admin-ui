import { API_URL } from '../../constants/API.js';
import { fetchWithErrorHandling } from '../main-page/apiErrorHandler.js';

/**
 * Fetches brand details by ID.
 *
 * @param {number|string} id - The ID of the brand to fetch.
 * @returns {Promise<Object>} The fetched brand data.
 */
export const fetchBrand = async (id) => {
    try {
        const response = await fetchWithErrorHandling(`${API_URL}/${id}`);
        return response; // Return the fetched brand object
    } catch (error) {
        console.error('Error fetching brand:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};

/**
 * Deletes a brand by ID with confirmation.
 *
 * @param {number|string} id - The ID of the brand to delete.
 * @returns {Promise<void>} Resolves when the brand is deleted.
 */
export const deleteBrand = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this brand?');
    if (!confirmed) return;

    try {
        await fetchWithErrorHandling(`${API_URL}/${id}`, { method: 'DELETE' });
        alert('Brand deleted successfully!');
    } catch (error) {
        console.error('Error deleting brand:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};
