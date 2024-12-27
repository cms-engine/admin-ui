import { API_URL } from '../../constants/API.js';
import {fetchWithErrorHandling} from "../main-page/apiErrorHandler";

document.getElementById('createButton').addEventListener('click', () => {
    document.getElementById('brandModalLabel').innerText = 'Create Brand';
    document.getElementById('brandNameInput').value = '';
});

async function createBrand(brandName) {
    try {
        const response = await fetchWithErrorHandling(`${API_URL}/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: brandName }),
        });

        console.log('Brand created successfully:', response);

        window.location = "/pages/brands/edit.html?id=" + response.id;
        alert('Brand created successfully!');
    } catch (error) {
        console.error('Failed to create brand:', error.message);
        alert('Error creating brand.');
    }
}
document.getElementById('saveBrandButton').addEventListener('click', () => {
    const id = document.getElementById('brandId').innerText.trim();
    const brandName = document.getElementById('brandName').value.trim();

    if (!id || !brandName) {
        alert('Brand ID and Name are required!');
        return;
    }

    void createBrand(id, brandName);
});




