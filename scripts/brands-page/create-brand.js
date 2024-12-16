document.getElementById('createButton').addEventListener('click', () => {
    document.getElementById('brandModalLabel').innerText = 'Create Brand';
    document.getElementById('brandNameInput').value = '';
});

document.getElementById('saveBrandButton').addEventListener('click', () => {
    const brandName = document.getElementById('brandNameInput').value.trim();
    if (!brandName) {
        alert('Brand name is required!');
        return;
    }

    // Example: Send brand data to the server
    createBrand({ name: brandName })
        .then(() => {
            alert('Brand created successfully!');
            loadBrands();
        })
        .catch((err) => {
            console.error(err);
            alert('Error creating brand.');
        });

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('brandModal'));
    modal.hide();
});

// Function to create a brand (mockup for demonstration)
async function createBrand(data) {
    // Replace this with your actual API call
    return fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then((res) => res.json());
}

// Load the list of brands (mockup for demonstration)
function loadBrands() {
    console.log('Reloading brand list...');
    // Implement dynamic brand list reloading logic here
}
