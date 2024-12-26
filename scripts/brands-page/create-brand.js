document.getElementById('createButton').addEventListener('click', () => {
    document.getElementById('brandModalLabel').innerText = 'Create Brand';
    document.getElementById('brandNameInput').value = '';
});


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

async function createBrand(brandName) {
    const url = `https://core-995b.onrender.com/admin/brands`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: brandName }),
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
    loadBrands();
});




