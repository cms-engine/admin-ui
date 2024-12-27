import { API_URL } from '../../constants/API.js';
import { fetchWithErrorHandling } from '../main-page/apiErrorHandler.js';

const editBrandForm = document.getElementById('editBrandForm');
const brandIdInput = document.getElementById('brandId');
const brandNameInput = document.getElementById('brandName');


const urlParams = new URLSearchParams(window.location.search);
const brandId = urlParams.get('id');
if (!brandId) {
    console.error('Brand ID is missing');
    alert('Invalid brand ID. Redirecting...');
    window.location.href = '../brands.html';
}

const fetchBrandDetails = async (brandId) => {
    try {
        const API_URL = 'http://165.227.137.72:8080/admin/brands/search';

        const requestBody = {
            page: 1,
            size: 1,
            sorts: [],
            filters: [
                {
                    field: 'id',
                    type: 'EQUAL',
                    value: [brandId],
                },
            ],
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorMessage = `Error ${response.status}: ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data.data && data.data.length > 0) {
            const brand = data.data[0];
            document.getElementById('brandName').value = brand.name; // Populate the form
        } else {
            alert('Brand not found. Redirecting...');
            window.location.href = '../brands.html';
        }
    } catch (error) {
        console.error('Error fetching brand details:', error);
        alert('Failed to fetch brand details.');
    }
};

// Save edited brand details
editBrandForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const updatedBrand = {
        name: brandNameInput.value.trim(),
    };

    try {
        const response = await fetch(`${API_URL}/admin/brands/${brandId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBrand),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        alert('Brand updated successfully.');
        window.location.href = '../../brands.html';
    } catch (error) {
        console.error('Error updating brand:', error);
        alert('Failed to update brand. Please try again later.');
    }
});


// Initialize form
if (brandId) {
  void fetchBrandDetails(brandId);
} else {
    alert('Invalid brand ID.');
    window.location.href = '../../brands.html';
}
