import { API_URL } from '../../constants/API.js';
import { fetchWithErrorHandling } from '../main-page/apiErrorHandler.js';

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
        await fetchWithErrorHandling(`${API_URL}/brands/${id}`, { method: 'DELETE' });
        alert('Brand deleted successfully!');
    } catch (error) {
        console.error('Error deleting brand:', error);
        throw error; // Re-throw the error for the caller to handle
    }
};
