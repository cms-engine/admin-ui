import {API_URL} from '../../constants/API.js';
import {fetchWithErrorHandling} from '../main-page/apiErrorHandler.js';

const addForm = document.getElementById('addForm');

addForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const brandName = document.getElementById('brandName').value.trim();

    if (!brandName) {
        alert('Brand name is required!');
        return;
    }

    void create(brandName)
});

async function create(brandName) {
    try {
        const response = await fetchWithErrorHandling(`${API_URL}/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: brandName}),
        });

        console.log('Brand created successfully:', response);

        window.location = "../../pages/brands/edit.html?id=" + response.id;
        alert(`Brand ${response.id} created successfully!`);
    } catch (error) {
        console.error('Failed to create brand:', error.message);
        alert('Error creating brand.');
    }
}
