/**
 * Fetches a list of brands from the API and renders the result into the 'brandsList' element.
 *
 * On success, the fetched brand data is passed to the `renderBrands` function to display the list.
 * On failure, an error is logged to the console and the `renderError` function is called to display an error message.
 *
 * @async
 * @throws {Error} Throws an error if the API response is not successful.
 */

const fetchAndRenderBrands = async () => {
    const API_URL = 'https://core-995b.onrender.com/admin/brands/search';
    const requestBody = {
        page: 1,
        size: 100
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        renderBrands(data.data)
    } catch (error) {
        console.error('Failed to fetch brands:', error)
        renderError()
    }
}
/**
 * Populates the content of a modal with the provided brand ID and name.
 *
 * Updates the elements with the IDs 'modalBrandId' and 'modalBrandName' to display the given values.
 *
 * @param {number|string} id - The ID of the brand to display in the modal.
 * @param {string} name - The name of the brand to display in the modal.
 */
const populateModal = (id, name) => {
    const modalBrandId = document.getElementById('modalBrandId')
    const modalBrandName = document.getElementById('modalBrandName')

    if (modalBrandId && modalBrandName) {
        modalBrandId.textContent = id
        modalBrandName.textContent = name
    }
}



/**
 * Renders a list of brands into the HTML element with the ID of 'brandsList'.
 *
 * Each brand is displayed as a list item with its name and ID styled using Bootstrap classes.
 *
 * @param {Array<Object>} brands - The array of brand objects to render.
 * @param {string} brands[].name - The name of the brand.
 * @param {number|string} brands[].id - The unique ID of the brand.
 */
const renderBrands = (brands) => {
    const listContainer = document.getElementById('brandsList')

    if (!listContainer) {
        console.error('Container for brands list not found')
        return
    }

    // Create a grid of cards
    listContainer.innerHTML = `
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            ${brands
        .map(
            (brand) => `
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${brand.name}</h5>
                                <p class="card-text text-muted">Brand ID: ${brand.id}</p>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">
                                <button 
                                    class="btn btn-primary btn-sm w-100 view-brand-btn" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#brandModal" 
                                    data-brand-id="${brand.id}" 
                                    data-brand-name="${brand.name}">
                                    View Brand
                                </button>
                            </div>
                        </div>
                    </div>
                `
        )
        .join('')}
        </div>
    `

    // Add event listeners to "View Brand" buttons
    const viewButtons = document.querySelectorAll('.view-brand-btn')
    viewButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const brandId = event.target.getAttribute('data-brand-id')
            const brandName = event.target.getAttribute('data-brand-name')
            populateModal(brandId, brandName)
        })
    })
}



/**
 * Renders an error message into the HTML element with the ID of 'brandsList'.
 *
 * The error message indicates that the brands could not be loaded, and it is styled using Bootstrap classes.
 */
const renderError = () => {
    const listContainer = document.getElementById('brandsList')


    if (listContainer) {
        listContainer.innerHTML = `
        <li class="list-group-item text-danger">
            Failed to load brands. Please try again later.
        </li>
    `
    }
}

// Initialize fetching and rendering on page load
document.addEventListener('DOMContentLoaded', fetchAndRenderBrands)

