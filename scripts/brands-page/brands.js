/**
 * Fetches a list of brands from the API and renders the result into the 'brandsList' element.
 *
 * On success, the fetched brand data is passed to the `renderBrands` function to display the list.
 * On failure, an error is logged to the console and the `renderError` function is called to display an error message.
 *
 * @async
 * @throws {Error} Throws an error if the API response is not successful.
 */

let currentPage = 1
let currentSortColumn = 'id'
let currentSortOrder = 'ASCENDING'
let filters = [] // Array to hold filter objects
const renderTable = (brands) => {
    const tableBody = document.getElementById('brandsTableBody')
    if (!tableBody) {
        console.error('Table body element not found')
        return
    }

    // Clear existing rows
    tableBody.innerHTML = ''

    // Add new rows
    tableBody.innerHTML = brands
        .map(
            (brand) => `
            <tr>
                <td><input type="checkbox" class="selectCheckbox" data-id="${brand.id}"></td>
                <td>${brand.id}</td>
                <td>${brand.name}</td>
                <td><button class="btn btn-sm btn-primary">Edit</button></td>
            </tr>
        `
        )
        .join('')
}

let isFetching = false

const fetchAndRenderBrands = async () => {
    if (isFetching) return // Prevent new requests while a fetch is ongoing
    isFetching = true

    const API_URL = 'https://core-995b.onrender.com/admin/brands/search'
    const requestBody = {
        page: currentPage,
        size: 10,
        sorts: [
            {
                field: currentSortColumn,
                direction: currentSortOrder
            }
        ],
        filters
    }

    console.log('Requesting with payload:', JSON.stringify(requestBody, null, 2))

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
        console.log('Received data:', data)
        renderTable(data.data)
        renderPagination(data.page, data.size, data.totalElements)
    } catch (error) {
        console.error('Failed to fetch brands:', error)
    } finally {
        isFetching = false // Reset the fetching flag
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

const renderPagination = (page, size, totalElements) => {
    const paginationContainer = document.getElementById('pagination')
    if (!paginationContainer) return

    const totalPages = Math.ceil(totalElements / size)
    let paginationHTML = ''

    for (let i = 1; i <= totalPages; i++) {
        paginationHTML += `
        <button 
            class="btn ${i === page ? 'btn-primary' : 'btn-light'}" 
            data-page="${i}">
            ${i}
        </button>
        `
    }

    paginationContainer.innerHTML = paginationHTML

    const paginationButtons = paginationContainer.querySelectorAll('button')
    paginationButtons.forEach((button) => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.dataset.page)
            fetchAndRenderBrands()
        })
    })
}

let debounceTimeout
const debounce = (func, delay) => {
    return (...args) => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => func(...args), delay)
    }
}

const debouncedFetchAndRenderBrands = debounce(fetchAndRenderBrands, 300)

/**
 * Handles sorting of the brands table based on the specified column.
 *
 * Toggles the sorting order (ascending or descending) if the same column is clicked consecutively.
 * Updates the current sort column and fetches the updated list of brands.
 *
 * @param {string} column - The name of the column to sort by (e.g., 'id' or 'name').
 */


export const handleSorting = (column) => {
    // Toggle sort order if the same column is clicked
    if (currentSortColumn === column) {
        currentSortOrder = currentSortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING'
    } else {
        // Set to ASCENDING for a new column
        currentSortColumn = column
        currentSortOrder = 'ASCENDING'
    }

    console.log(`Sorting by ${currentSortColumn} in ${currentSortOrder} order`)

    // Fetch data with the updated sort order
    fetchAndRenderBrands()
}

/**
 * Handles filtering of the brands table based on user input.
 *
 * Applies a "LIKE" filter on the 'name' field if a value is provided in the input.
 * Clears the filters if the input is empty. Resets the current page to the first page and fetches the updated list.
 *
 * @param {Event} e - The input event triggered by the filter input element.
 */
export let handleFiltering = (e) => {
    const filterValue = e.target.value.trim()
    const filterField = e.target.dataset.field // Use a data attribute to identify the field

    if (filterValue && filterField) {
        filters = [
            {
                field: filterField, // The field to filter (either "id" or "name")
                type: filterField === 'id' ? 'EQUAL' : 'LIKE', // Use "EQUAL" for id, "LIKE" for name
                value: [filterValue]
            }
        ]
    } else {
        filters = [] // Clear filters if input is empty
    }

    currentPage = 1 // Reset to the first page
    fetchAndRenderBrands()
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

document.addEventListener('DOMContentLoaded', () => {
    const idHeader = document.querySelector('th:nth-child(2)')
    const nameHeader = document.querySelector('th:nth-child(3)')

    if (idHeader && !idHeader.dataset.listenerAdded) {
        idHeader.addEventListener('click', () => handleSorting('id'))
        idHeader.dataset.listenerAdded = true
    }

    if (nameHeader && !nameHeader.dataset.listenerAdded) {
        nameHeader.addEventListener('click', () => handleSorting('name'))
        nameHeader.dataset.listenerAdded = true
    }
})


console.log(`Sorting by ${currentSortColumn}, Order: ${currentSortOrder}`)
