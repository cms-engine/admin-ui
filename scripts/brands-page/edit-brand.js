import { API_URL } from '../../constants/API.js';
import { fetchWithErrorHandling } from '../main-page/apiErrorHandler.js';

const editBrandForm = document.getElementById('editBrandForm');
const brandIdInput = document.getElementById('brandId');
const brandNameInput = document.getElementById('brandName');

// Extract the brand ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const brandId = urlParams.get('id');

// Fetch brand details and populate the form
const fetchBrandDetails = async (id) => {
    try {
        const data = await fetchWithErrorHandling(`${API_URL}/brands/${id}`);
        brandIdInput.value = data.id;
        brandNameInput.value = data.name;
    } catch (error) {
        console.error('Error fetching brand details:', error);
        alert('Failed to load brand details.');
    }
};

// Save edited brand details
editBrandForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const updatedBrand = {
        name: brandNameInput.value.trim(),
    };

    try {
        await fetchWithErrorHandling(`${API_URL}/brands/${brandId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBrand),
        });
        alert('Brand updated successfully.');
        window.location.href = '../../brands.html';
    } catch (error) {
        console.error('Error updating brand:', error);
        alert('Failed to update brand.');
    }
});

// Initialize form
if (brandId) {
   void fetchBrandDetails(brandId);
} else {
    alert('Invalid brand ID.');
    window.location.href = '../../brands.html';
}
