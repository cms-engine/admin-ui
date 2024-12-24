import {API_URL} from '../../constants/API.js';
import {fetchWithErrorHandling} from "../main-page/apiErrorHandler.js";

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
let currentView = "table";

/**
 * Renders the brands table.
 *
 * @param {Array<Object>} brands - List of brands to render.
 */

const renderTable = (brands) => {
	const tableBody = document.getElementById('brandsTableBody')
	if (!tableBody) {
		console.error('Table body element not found')
		return
	}
	tableBody.innerHTML = ''
	tableBody.innerHTML = brands
	.map(
	  (brand) => `
            <tr>
                <td><input type='checkbox' class='selectCheckbox' data-id='${brand.id}'></td>
                <td>${brand.id}</td>
                <td>${brand.name}</td>
                <td><button class='btn btn-sm btn-primary'>Edit</button></td>
            </tr>
        `
	)
	.join('')
}

let isFetching = false

/**
 * Toggles between table and card views.
 *
 * @param {string} view - The view to render ('table' or 'card').
 * @param {Array<Object>} brands - The data to render.
 */
const toggleView = (view, brands) => {
	const tableContainer = document.getElementById("tableContainer");
	const brandsContainer = document.getElementById("brandsContainer");
	
	if (view === "table") {
		tableContainer.style.display = "block";
		brandsContainer.style.display = "none";
		renderTable(brands);
	} else {
		tableContainer.style.display = "none";
		brandsContainer.style.display = "block";
		renderBrands(brands);
	}
	currentView = view;
};
/**
 * Fetches and renders the brands list with pagination and sorting.
 *
 * On error, it calls `renderError` to display an error message.
 *
 * @async
 * @throws {Error} Throws an error if the API request fails.
 */

const fetchAndRenderBrands = async () => {
	if (isFetching) return
	isFetching = true

	const requestBody = {
		page: currentPage,
		size: 10,
		sorts: [
			{
				field: currentSortColumn,
				direction: currentSortOrder,
			},
		],
		filters,
	}

	try {
		const data = await fetchWithErrorHandling(API_URL + '/brands/search', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestBody),
		})

		const brandsListContainer = document.getElementById("brandsList")
		const paginationContainer = document.getElementById("pagination")

		if (data.data && data.data.length > 0) {
			toggleView(currentView, data.data)
			renderPagination(data.page, data.size, data.totalElements)
			if (paginationContainer) paginationContainer.style.display = "flex"
		} else {
			// No brands: Clear list and hide pagination
			if (brandsListContainer) {
				brandsListContainer.innerHTML = "<p>No brands available to display.</p>"
			}
			if (paginationContainer) {
				paginationContainer.innerHTML = ""
				paginationContainer.style.display = "none"
			}
		}
	} catch (error) {
		console.error("Failed to fetch brands:", error)
		const brandsListContainer = document.getElementById("brandsList")
		const paginationContainer = document.getElementById("pagination")

		// Handle error case: Clear UI
		if (brandsListContainer) {
			brandsListContainer.innerHTML = "<p class='text-danger'>Error fetching brands. Please try again later.</p>"
		}
		if (paginationContainer) {
			paginationContainer.innerHTML = ""
			paginationContainer.style.display = "none"
		}
	} finally {
		isFetching = false
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
 * Renders the brands list in a card layout.
 *
 * @param {Array<Object>} brands - List of brands.
 */
const renderBrands = (brands) => {
	const listContainer = document.getElementById("brandsList");
	
	if (!listContainer) {
		console.error("Container for brands list not found");
		return;
	}
	
	listContainer.innerHTML = `
        <div class='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
            ${brands
	.map(
	  (brand) => `
                        <div class='col'>
                            <div class='card h-100'>
                                <div class='card-body'>
                                    <h5 class='card-title'>${brand.name}</h5>
                                    <p class='card-text text-muted'>Brand ID: ${brand.id}</p>
                                </div>
                                <div class='card-footer bg-transparent border-top-0'>
                                    <button
                                        class='btn btn-primary btn-sm w-100 view-brand-btn'
                                        data-bs-toggle='modal'
                                        data-bs-target='#brandModal'
                                        data-brand-id='${brand.id}'
                                        data-brand-name='${brand.name}'>
                                        View Brand
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
	)
	.join("")}
        </div>
    `;
	
	const viewButtons = document.querySelectorAll(".view-brand-btn");
	viewButtons.forEach((button) => {
		button.addEventListener("click", (event) => {
			const brandId = event.target.getAttribute("data-brand-id");
			const brandName = event.target.getAttribute("data-brand-name");
			populateModal(brandId, brandName);
		});
	});
};

/**
 * Renders pagination buttons.
 *
 * @param {number} page - Current page.
 * @param {number} size - Page size.
 * @param {number} totalElements - Total number of elements.
 */

const renderPagination = (page, size, totalElements) => {
	const paginationContainer = document.getElementById('pagination')
	if (!paginationContainer) return
	
	const totalPages = Math.ceil(totalElements / size)
	let paginationHTML = ''
	
	for (let i = 1; i <= totalPages; i++) {
		paginationHTML += `
        <button 
            class='btn ${i === page ? 'btn-primary' : 'btn-light'}'
            data-page='${i}'>
            ${i}
        </button>
        `
	}
	
	paginationContainer.innerHTML = paginationHTML
	
	const paginationButtons = paginationContainer.querySelectorAll('button')
	paginationButtons.forEach((button) => {
		button.addEventListener('click', () => {
			currentPage = parseInt(button.dataset.page)
			void fetchAndRenderBrands()
		})
	})
}

let debounceTimeout;

/**
 * Creates a debounced function to limit the frequency of calls.
 *
 * @param {Function} func - Function to debounce.
 * @param {number} delay - Debounce delay in milliseconds.
 * @returns {Function} Debounced function.
 */
const debounce = (func, delay) => {
	return (...args) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => func(...args), delay);
	};
};

const debouncedFetchAndRenderBrands = debounce(fetchAndRenderBrands, 300);

/**
 * Handles sorting of the brands table based on the specified column.
 *
 * Toggles the sorting order (ascending or descending) if the same column is clicked consecutively.
 * Updates the current sort column and fetches the updated list of brands.
 *
 * @param {string} column - The name of the column to sort by (e.g., 'id' or 'name').
 */


export let handleSorting = (column) => {
	if (currentSortColumn === column) {
		currentSortOrder = currentSortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING'
	} else {
		currentSortColumn = column
		currentSortOrder = 'ASCENDING'
	}
	void fetchAndRenderBrands()
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
	const filterValue = e.target.value.trim();
	const filterField = e.target.dataset.field;
	
	if (filterValue && filterField) {
		filters = [
			{
				field: filterField,
				type: filterField === "id" ? "EQUAL" : "LIKE",
				value: [filterValue],
			},
		];
	} else {
		filters = [];
	}
	
	currentPage = 1;
	debouncedFetchAndRenderBrands();
};


document.addEventListener("DOMContentLoaded", () => {
	void fetchAndRenderBrands();
	
	const filterByNameInput = document.querySelector("#filterByName");
	const filterByIdInput = document.querySelector("#filterById");
	filterByNameInput.addEventListener("input", handleFiltering);
	filterByIdInput.addEventListener("input", handleFiltering);
	
	const idHeader = document.querySelector("th:nth-child(2)");
	const nameHeader = document.querySelector("th:nth-child(3)");
	
	idHeader?.addEventListener("click", () => handleSorting("id"));
	nameHeader?.addEventListener("click", () => handleSorting("name"));
});
