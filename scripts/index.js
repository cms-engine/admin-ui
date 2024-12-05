import {handleApiErrors, showToast} from './apiErrorHandler.js';


document.addEventListener('DOMContentLoaded', () => {
	const ctxArea = document.getElementById('areaChart').getContext('2d')
	const ctxBar = document.getElementById('barChart').getContext('2d')
	
	// Area Chart
	new Chart(ctxArea, {
		type: 'line',
		data: {
			labels: ['March 1', 'March 3', 'March 5', 'March 7', 'March 9', 'March 11', 'March 13'],
			datasets: [
				{
					label: 'Example Data',
					data: [4000, 8000, 12000, 16000, 20000, 24000, 28000],
					borderColor: '#3498db',
					backgroundColor: 'rgba(52, 152, 219, 0.5)',
					fill: true,
				},
			],
		},
	})
	
	
	new Chart(ctxBar, {
		type: 'bar',
		data: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June'],
			datasets: [
				{
					label: 'Example Data',
					data: [5000, 10000, 15000, 20000, 25000, 30000],
					backgroundColor: '#e74c3c',
				},
			],
		},
	})
})

const data = [
	{name: "Airi Satou", position: "Accountant", office: "Tokyo", age: 33, startDate: "2008/11/28", salary: 162700},
	{name: "Angelica Ramos", position: "CEO", office: "London", age: 47, startDate: "2009/10/09", salary: 1200000},
	{
		name: "Ashton Cox",
		position: "Junior Technical Author",
		office: "San Francisco",
		age: 66,
		startDate: "2009/01/12",
		salary: 86000
	},
	{
		name: "Tiger Nixon",
		position: "System Architect",
		office: "Edinburgh",
		age: 61,
		startDate: "2011/04/25",
		salary: 320800
	},
	{
		name: "Garrett Winters",
		position: "Accountant",
		office: "Tokyo",
		age: 63,
		startDate: "2011/07/25",
		salary: 170750
	},
	{
		name: "Cedric Kelly",
		position: "Senior Javascript Developer",
		office: "Edinburgh",
		age: 22,
		startDate: "2012/03/29",
		salary: 433060
	},
	{
		name: "Herrod Chandler",
		position: "Sales Assistant",
		office: "San Francisco",
		age: 59,
		startDate: "2012/08/06",
		salary: 137500
	},
	{
		name: "Rhona Davidson",
		position: "Integration Specialist",
		office: "Tokyo",
		age: 55,
		startDate: "2010/10/14",
		salary: 327900
	},
	{
		name: "Colleen Hurst",
		position: "Javascript Developer",
		office: "San Francisco",
		age: 39,
		startDate: "2009/09/15",
		salary: 205500
	},
	{
		name: "Sonya Frost",
		position: "Software Engineer",
		office: "Edinburgh",
		age: 23,
		startDate: "2008/12/13",
		salary: 103600
	},
	{
		name: "Jena Gaines",
		position: "Office Manager",
		office: "London",
		age: 30,
		startDate: "2008/12/19",
		salary: 90560
	},
	{
		name: "Quinn Flynn",
		position: "Support Lead",
		office: "Edinburgh",
		age: 22,
		startDate: "2013/03/03",
		salary: 342000
	},
	{
		name: "Charde Marshall",
		position: "Regional Director",
		office: "San Francisco",
		age: 36,
		startDate: "2008/10/16",
		salary: 470600
	},
	{
		name: "Haley Kennedy",
		position: "Senior Marketing Designer",
		office: "London",
		age: 43,
		startDate: "2012/12/18",
		salary: 313500
	},
	{
		name: "Tatyana Fitzpatrick",
		position: "Regional Director",
		office: "London",
		age: 19,
		startDate: "2010/03/17",
		salary: 385750
	},
	{
		name: "Michael Silva",
		position: "Marketing Designer",
		office: "San Francisco",
		age: 66,
		startDate: "2012/11/27",
		salary: 198500
	},
	{
		name: "Paul Byrd",
		position: "Chief Financial Officer (CFO)",
		office: "New York",
		age: 64,
		startDate: "2010/06/09",
		salary: 725000
	},
	{
		name: "Gloria Little",
		position: "Systems Administrator",
		office: "New York",
		age: 59,
		startDate: "2009/04/10",
		salary: 237500
	},
	{
		name: "Bradley Greer",
		position: "Software Engineer",
		office: "London",
		age: 41,
		startDate: "2012/10/13",
		salary: 132000
	},
	{
		name: "Dai Rios",
		position: "Personnel Lead",
		office: "Edinburgh",
		age: 35,
		startDate: "2012/09/26",
		salary: 217500
	},
	{
		name: "Jenette Caldwell",
		position: "Development Lead",
		office: "New York",
		age: 30,
		startDate: "2011/09/03",
		salary: 345000
	},
	{
		name: "Yuri Berry",
		position: "Chief Marketing Officer (CMO)",
		office: "New York",
		age: 40,
		startDate: "2009/06/25",
		salary: 675000
	},
	{
		name: "Caesar Vance",
		position: "Pre-Sales Support",
		office: "New York",
		age: 21,
		startDate: "2011/12/12",
		salary: 106450
	},
	{
		name: "Doris Wilder",
		position: "Sales Assistant",
		office: "Sidney",
		age: 23,
		startDate: "2010/09/20",
		salary: 85600
	},
	{
		name: "Angelica Moreno",
		position: "Web Developer",
		office: "San Francisco",
		age: 29,
		startDate: "2013/03/15",
		salary: 96500
	},
	{
		name: "Gavin Joyce",
		position: "System Administrator",
		office: "Edinburgh",
		age: 30,
		startDate: "2010/02/20",
		salary: 96100
	},
	{
		name: "Joyce Albers",
		position: "Frontend Developer",
		office: "Tokyo",
		age: 32,
		startDate: "2011/04/15",
		salary: 187000
	},
	{
		name: "Melody Hope",
		position: "UX Designer",
		office: "New York",
		age: 27,
		startDate: "2012/07/23",
		salary: 126000
	},
	{
		name: "Finn Cooper",
		position: "Junior UX Designer",
		office: "San Francisco",
		age: 24,
		startDate: "2011/11/11",
		salary: 62000
	},
	{
		name: "Alicia Moore",
		position: "Product Manager",
		office: "London",
		age: 44,
		startDate: "2010/01/22",
		salary: 340200
	},
	{
		name: "Brittany Sutton",
		position: "Backend Engineer",
		office: "Edinburgh",
		age: 37,
		startDate: "2008/06/30",
		salary: 208700
	},
	{
		name: "Harold Barnes",
		position: "HR Manager",
		office: "New York",
		age: 50,
		startDate: "2009/02/01",
		salary: 89000
	},
	{
		name: "Ella Stone",
		position: "Software Tester",
		office: "Tokyo",
		age: 28,
		startDate: "2013/08/12",
		salary: 105500
	},
	{
		name: "Victor Howard",
		position: "Mobile Developer",
		office: "San Francisco",
		age: 33,
		startDate: "2012/06/06",
		salary: 125400
	},
	{
		name: "Hannah Miles",
		position: "Product Designer",
		office: "Sidney",
		age: 39,
		startDate: "2010/07/19",
		salary: 201500
	},
	{
		name: "Connor Smith",
		position: "Game Developer",
		office: "London",
		age: 31,
		startDate: "2011/05/08",
		salary: 118900
	},
	{
		name: "Julian Fisher",
		position: "Art Director",
		office: "New York",
		age: 34,
		startDate: "2008/04/17",
		salary: 165000
	},
	{
		name: "Sophia Ward",
		position: "Junior Art Director",
		office: "San Francisco",
		age: 26,
		startDate: "2010/12/09",
		salary: 88000
	},
	{
		name: "Zachary Lee",
		position: "Data Scientist",
		office: "Edinburgh",
		age: 40,
		startDate: "2013/03/12",
		salary: 201000
	},
	{
		name: "Mariah Nguyen",
		position: "AI Specialist",
		office: "Tokyo",
		age: 29,
		startDate: "2011/11/21",
		salary: 232000
	},
	{
		name: "Brian McKenzie",
		position: "Database Administrator",
		office: "London",
		age: 36,
		startDate: "2012/09/05",
		salary: 115000
	},
	{
		name: "Caroline Reese",
		position: "Technical Lead",
		office: "New York",
		age: 48,
		startDate: "2008/02/10",
		salary: 199000
	},
	{
		name: "James Turner",
		position: "Security Engineer",
		office: "San Francisco",
		age: 52,
		startDate: "2009/01/30",
		salary: 112000
	},
	{
		name: "Olivia Walker",
		position: "Frontend Engineer",
		office: "Sidney",
		age: 25,
		startDate: "2010/05/13",
		salary: 91000
	},
	{
		name: "Jacob Phillips",
		position: "Full Stack Developer",
		office: "London",
		age: 43,
		startDate: "2011/03/20",
		salary: 212000
	},
	{
		name: "Ella Bennett",
		position: "Data Engineer",
		office: "Tokyo",
		age: 29,
		startDate: "2013/09/04",
		salary: 136700
	},
	{
		name: "Sophia Harris",
		position: "Project Manager",
		office: "New York",
		age: 49,
		startDate: "2008/11/18",
		salary: 278900
	},
	{
		name: "David Martinez",
		position: "UI Designer",
		office: "Edinburgh",
		age: 35,
		startDate: "2012/01/15",
		salary: 107000
	},
];

let currentPage = 1;
let rowsPerPage = 10;


const renderTable = (data, page, rows) => {
	const start = (page - 1) * rows;
	const end = start + rows;
	const paginatedData = data.slice(start, end);
	
	const tableBody = document.getElementById("tableBody");
	tableBody.innerHTML = "";
	paginatedData.forEach((row) => {
		const tr = document.createElement("tr");
		tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.position}</td>
      <td>${row.office}</td>
      <td>${row.age}</td>
      <td>${row.startDate}</td>
      <td>$${row.salary.toLocaleString()}</td>
    `;
		tableBody.appendChild(tr);
	});
	
	// Update table info
	const tableInfo = document.getElementById("tableInfo");
	tableInfo.textContent = `Showing ${start + 1} to ${Math.min(end, data.length)} of ${data.length} entries`;
};

const renderPagination = (data, rowsPerPage) => {
	const totalPages = Math.ceil(data.length / rowsPerPage);
	const pagination = document.getElementById("pagination");
	pagination.innerHTML = ""; // Clear existing pagination
	
	// Add "Previous" button
	const prevButton = document.createElement("li");
	prevButton.classList.add("page-item");
	prevButton.innerHTML = `<a class='page-link' href='#' aria-label='Previous'>&laquo;</a>`;
	prevButton.classList.toggle("disabled", currentPage === 1);
	prevButton.addEventListener("click", (e) => {
		e.preventDefault();
		if (currentPage > 1) {
			currentPage--;
			renderTable(data, currentPage, rowsPerPage);
			renderPagination(data, rowsPerPage);
		}
	});
	pagination.appendChild(prevButton);
	
	// Add numbered page buttons
// Add numbered page buttons
	for (let i = 1; i <= totalPages; i++) {
		const pageItem = document.createElement("li");
		pageItem.classList.add("page-item");
		if (i === currentPage) {
			pageItem.classList.add("active");
		}
		pageItem.innerHTML = `<a class='page-link' href='#'>${i}</a>`;
		pageItem.addEventListener("click", (e) => {
			e.preventDefault();
			currentPage = i;
			renderTable(data, currentPage, rowsPerPage);
			renderPagination(data, rowsPerPage);
		});
		pagination.appendChild(pageItem);
	}
	
	
	// Add "Next" button
	const nextButton = document.createElement("li");
	nextButton.classList.add("page-item");
	nextButton.innerHTML = `<a class='page-link' href='#' aria-label='Next'>&raquo;</a>`;
	nextButton.classList.toggle("disabled", currentPage === totalPages);
	nextButton.addEventListener("click", (e) => {
		e.preventDefault();
		if (currentPage < totalPages) {
			currentPage++;
			renderTable(data, currentPage, rowsPerPage);
			renderPagination(data, rowsPerPage);
		}
	});
	pagination.appendChild(nextButton);
};
/**
 * Sorts the data by the specified column and order.
 *
 * @param {Array<Object>} data - The dataset to sort.
 * @param {string} column - The column name by which to sort.
 * @param {string} order - The order to sort by, either 'asc' or 'desc'.
 * @returns {Array<Object>} - The sorted data array.
 */
const sortTable = (data, column, order) => {
	return data.sort((a, b) => {
		if (typeof a[column] === "number") {
			return order === "asc" ? a[column] - b[column] : b[column] - a[column];
		} else {
			return order === "asc"
			  ? a[column].localeCompare(b[column])
			  : b[column].localeCompare(a[column]);
		}
	});
};
/**
 * Initializes the table with data, pagination, and adds sorting and search functionality.
 */

const initTable = () => {
	renderTable(data, currentPage, rowsPerPage);
	renderPagination(data, rowsPerPage);
	
	// Add sorting functionality
	document.querySelectorAll("th[data-column]").forEach((th) => {
		th.addEventListener("click", () => {
			const column = th.getAttribute("data-column");
			const order = th.getAttribute("data-order");
			sortTable(data, column, order === "asc" ? "asc" : "desc");
			th.setAttribute("data-order", order === "asc" ? "desc" : "asc");
			renderTable(data, currentPage, rowsPerPage);
		});
	});
	
	// Add rows per page functionality
	document.getElementById("entriesPerPage").addEventListener("change", (e) => {
		rowsPerPage = parseInt(e.target.value);
		currentPage = 1;
		renderTable(data, currentPage, rowsPerPage);
		renderPagination(data, rowsPerPage);
	});
	
	// Add search functionality
	document.getElementById("searchTable").addEventListener("input", (e) => {
		const searchTerm = e.target.value.toLowerCase();
		const filteredData = data.filter((row) =>
		  Object.values(row).some((value) =>
			value.toString().toLowerCase().includes(searchTerm)
		  )
		);
		currentPage = 1;
		renderTable(filteredData, currentPage, rowsPerPage);
		renderPagination(filteredData, rowsPerPage);
	});
};

/**
 * Fetches data from a specified API endpoint and handles any errors.
 * Also logs the data to the console.
 */
const fetchData = () => {
fetch('http://localhost:3001/test')
  .then(handleApiErrors)
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
}

fetchData()
showToast('Test Message: Top-Right Toast');
document.addEventListener("DOMContentLoaded", () => initTable());