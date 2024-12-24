import { API_URL } from '../../constants/API.js';
import { fetchWithErrorHandling } from '../main-page/apiErrorHandler.js';


let currentPage = 1;
let currentSortColumn = 'id';
let currentSortOrder = 'ASCENDING';
let filters = []; 


/**
 * Fetches a list of brands from the API.
 * @returns {Promise<Array>} The list of brands fetched from the API.
 */
const fetchBrands = async () => {
	const requestBody = {
		page: currentPage,
		size: 10, // Adjust as needed
		sorts: [
			{
				field: currentSortColumn,
				direction: currentSortOrder,
			},
		],
		filters,
	};

	try {
		const response = await fetchWithErrorHandling(API_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(requestBody),
		});

		return response.data || [];
	} catch (error) {
		console.error('Error fetching brands:', error);
		return [];
	}
};

/**
 * Populates the content of the modal with the selected brand's details.
 * Updates the modal title to "Edit Brand" and pre-fills the brand name input.
 * @param {number|string} id - Brand ID.
 * @param {string} name - Brand name.
 */
const populateModal = (id, name) => {
	const modalTitle = document.getElementById('brandModalLabel');
	const brandNameInput = document.getElementById('brandNameInput'); 

	if (modalTitle && brandNameInput) {
		modalTitle.textContent = 'Edit Brand'; 
		brandNameInput.value = name;
	}

	const modal = new bootstrap.Modal(document.getElementById('brandModal'), {
		keyboard: true,
	});
	modal.show();
};



/**
 * Renders the brands table in the DOM.
 * @param {Array<Object>} brands - List of brands to render.
 */
const renderBrands = (brands) => {
	const tableBody = document.getElementById('brandsTableBody');
	if (!tableBody) {
		console.error('Table body element not found');
		return;
	}

	tableBody.innerHTML = brands
		.map(
			(brand) => `
        <tr>
          <td><input type="checkbox" class="selectCheckbox" data-id="${brand.id}"></td>
          <td>${brand.id}</td>
          <td>${brand.name}</td>
          <td>
            <button class="btn btn-sm btn-primary edit-brand-btn" data-id="${brand.id}" data-name="${brand.name}">
              Edit
            </button>
          </td>
        </tr>
      `
		)
		.join('');

	// Attach event listeners to Edit buttons
	document.querySelectorAll('.edit-brand-btn').forEach((button) => {
		button.addEventListener('click', (event) => {
			const brandId = event.target.getAttribute('data-id');
			const brandName = event.target.getAttribute('data-name');
			populateModal(brandId, brandName);
		});
	});
};



/**
 * Sorts the brands based on the selected column and toggles sorting order.
 * @param {string} column - Column to sort by ('id' or 'name').
 */
export const handleSorting = (column) => {
	if (currentSortColumn === column) {
		currentSortOrder = currentSortOrder === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING';
	} else {
		currentSortColumn = column;
		currentSortOrder = 'ASCENDING';
	}
	void fetchAndRenderBrands();
};

/**
 * Filters the brands list based on user input.
 * @param {Event} e - Input event from the filter input.
 */
export const handleFiltering = (e) => {
	const filterValue = e.target.value.trim();
	const filterField = e.target.dataset.field;

	if (filterValue && filterField) {
		filters = [
			{
				field: filterField,
				type: filterField === 'id' ? 'EQUAL' : 'LIKE',
				value: [filterValue],
			},
		];
	} else {
		filters = [];
	}

	currentPage = 1;
	void fetchAndRenderBrands();
};

/**
 * Fetches and renders the brands list.
 */
const fetchAndRenderBrands = async () => {
	const brands = await fetchBrands();
	renderBrands(brands);
};

// Initialize the page and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
	const filterByNameInput = document.querySelector('#filterByName');
	const filterByIdInput = document.querySelector('#filterById');

	filterByNameInput.addEventListener('input', debounce(handleFiltering, 300));
	filterByIdInput.addEventListener('input', debounce(handleFiltering, 300));

	document.querySelector('th:nth-child(2)').addEventListener('click', () => handleSorting('id'));
	document.querySelector('th:nth-child(3)').addEventListener('click', () => handleSorting('name'));

	void fetchAndRenderBrands();
});

/**
 * Debounce utility to reduce frequent calls.
 * @param {Function} func - Function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
const debounce = (func, delay) => {
	let debounceTimeout;
	return (event) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => func(event), delay);
	};
};
