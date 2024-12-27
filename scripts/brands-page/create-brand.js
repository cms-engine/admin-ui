import {API_URL} from "../../constants/API";

document.getElementById('createButton').addEventListener('click', () => {
    document.getElementById('brandModalLabel').innerText = 'Create Brand';
    document.getElementById('brandNameInput').value = '';
});

const brandNameInput = document.getElementById('brandNameInput');
const urlParams = new URLSearchParams(window.location.search);
const copyId = urlParams.get('copyId');
if (copyId) {
    const fetchBrandDetails = async (copyId) => {
        try {
            const requestBody = {
                page: 1,
                size: 1,
                sorts: [],
                filters: [
                    {
                        field: 'id',
                        type: 'EQUAL',
                        value: [copyId],
                    },
                ]
            }
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                const errorMessage = `Error ${response.status}: ${response.statusText}`;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json();
            if (data.data && data.data.length > 0) {
                const brand = data.data[0];
                brandNameInput.value = brand.name;
            } else {
                alert('Brand not found. Redirecting...');
                window.location.href = '../brands.html';
            }
        } catch (error) {
            console.error('Error fetching brand details:', error);
            alert('Failed to fetch brand details.');
        }
    }

    void fetchBrandDetails(copyId);
}

/**
 * Renders a list of brand objects into a table in the DOM.
 *
 * @param {Array<{id: number, name: string}>} brands - An array of brand objects.
 * Each brand should include `id` (number) and `name` (string) properties.
 *
 * Example of brand object:
 * `{ id: 1, name: "Brand Name" }`
 */
const renderBrands = (brands) => {
    const tableBody = document.getElementById('brandsTableBody');
    tableBody.innerHTML = '';
    brands.forEach((brand) => {
        const row = `
            <tr>
                <td>
                    <label>
                        <input type="checkbox" value="${brand.id}">
                    </label>
                </td>
                <td>${brand.id}</td>
                <td>${brand.name}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editBrand(${brand.id}, '${brand.name}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBrand(${brand.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}
/**
 * Asynchronously fetches a list of brands from the server and renders them.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the brands are successfully loaded and rendered.
 * It fetches data from the endpoint `https://core-995b.onrender.com/admin/brands`
 * and passes the fetched data to the `renderBrands` function.
 *
 * @throws Will log an error message to the console if the fetch request fails or the response is not OK.
 */
const loadBrands = async () => {
    const url = `https://core-995b.onrender.com/admin/brands`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const brands = await response.json();
        renderBrands(brands);
    } catch (error) {
        console.error('Failed to load brands:', error.message);
    }
}

/**
 * Sends a POST request to create a new brand with the given name.
 *
 * @async
 * @param {string} brandName - The name of the brand to be created.
 *
 * @returns {Promise<void>} A promise that resolves when the brand is successfully created.
 *
 * It sends a JSON payload to the endpoint `https://core-995b.onrender.com/admin/brands`
 * containing the `name` of the brand in the following format:
 * `{ name: "Brand Name" }`.
 *
 * @throws Will log an error message to the console if the POST request fails or the response is not OK.
 * Displays a success alert if the brand is created successfully, otherwise displays an error alert.
 */
async function createBrand(brandName) {
    const url = `https://core-995b.onrender.com/admin/brands`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: brandName}),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Brand created successfully:', data);
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
    void loadBrands();
});




