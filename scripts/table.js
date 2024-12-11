let currentPage = 1
let rowsPerPage = 10

/**
 * Renders the table with paginated data.
 *
 * @param {Array<Object>} data - The dataset to render.
 * @param {number} page - Current page number.
 * @param {number} rows - Number of rows per page.
 */
export const renderTable = (data, page, rows) => {
    const start = (page - 1) * rows
    const end = start + rows
    const paginatedData = data.slice(start, end)

    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    paginatedData.forEach((row) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
      <td>${row.name}</td>
      <td>${row.position}</td>
      <td>${row.office}</td>
      <td>${row.age}</td>
      <td>${row.startDate}</td>
      <td>$${row.salary.toLocaleString()}</td>
    `
        tableBody.appendChild(tr)
    })

    // Update table info
    const tableInfo = document.getElementById('tableInfo')
    tableInfo.textContent = `Showing ${start + 1} to ${Math.min(end, data.length)} of ${data.length} entries`
}

/**
 * Renders pagination controls for the table.
 *
 * @param {Array<Object>} data - The dataset to paginate.
 * @param {number} rowsPerPage - Number of rows per page.
 */
export const renderPagination = (data, rowsPerPage) => {
    const totalPages = Math.ceil(data.length / rowsPerPage)
    const pagination = document.getElementById('pagination')
    pagination.innerHTML = '' // Clear existing pagination

    // Add "Previous" button
    const prevButton = document.createElement('li')
    prevButton.classList.add('page-item')
    prevButton.innerHTML = `<a class='page-link' href='#' aria-label='Previous'>&laquo;</a>`
    prevButton.classList.toggle('disabled', currentPage === 1)
    prevButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (currentPage > 1) {
            currentPage--
            renderTable(data, currentPage, rowsPerPage)
            renderPagination(data, rowsPerPage)
        }
    })
    pagination.appendChild(prevButton)

    // Add numbered page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li')
        pageItem.classList.add('page-item')
        if (i === currentPage) {
            pageItem.classList.add('active')
        }
        pageItem.innerHTML = `<a class='page-link' href='#'>${i}</a>`
        pageItem.addEventListener('click', (e) => {
            e.preventDefault()
            currentPage = i
            renderTable(data, currentPage, rowsPerPage)
            renderPagination(data, rowsPerPage)
        })
        pagination.appendChild(pageItem)
    }

    // Add "Next" button
    const nextButton = document.createElement('li')
    nextButton.classList.add('page-item')
    nextButton.innerHTML = `<a class='page-link' href='#' aria-label='Next'>&raquo;</a>`
    nextButton.classList.toggle('disabled', currentPage === totalPages)
    nextButton.addEventListener('click', (e) => {
        e.preventDefault()
        if (currentPage < totalPages) {
            currentPage++
            renderTable(data, currentPage, rowsPerPage)
            renderPagination(data, rowsPerPage)
        }
    })
    pagination.appendChild(nextButton)
}

/**
 * Initializes the table with data, pagination, and adds sorting and search functionality.
 *
 * @param {Array<Object>} data - The dataset to initialize.
 */
export const initTable = (data) => {
    renderTable(data, currentPage, rowsPerPage)
    renderPagination(data, rowsPerPage)

    // Add sorting functionality
    document.querySelectorAll('th[data-column]').forEach((th) => {
        th.addEventListener('click', () => {
            const column = th.getAttribute('data-column')
            const order = th.getAttribute('data-order')
            data.sort((a, b) =>
                typeof a[column] === 'number'
                    ? order === 'asc'
                        ? a[column] - b[column]
                        : b[column] - a[column]
                    : order === 'asc'
                        ? a[column].localeCompare(b[column])
                        : b[column].localeCompare(a[column])
            )
            th.setAttribute('data-order', order === 'asc' ? 'desc' : 'asc')
            renderTable(data, currentPage, rowsPerPage)
        })
    })

    // Add rows per page functionality
    document.getElementById('entriesPerPage').addEventListener('change', (e) => {
        rowsPerPage = parseInt(e.target.value)
        currentPage = 1
        renderTable(data, currentPage, rowsPerPage)
        renderPagination(data, rowsPerPage)
    })

    // Add search functionality
    document.getElementById('searchTable').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase()
        const filteredData = data.filter((row) =>
            Object.values(row).some((value) =>
                value.toString().toLowerCase().includes(searchTerm)
            )
        )
        currentPage = 1
        renderTable(filteredData, currentPage, rowsPerPage)
        renderPagination(filteredData, rowsPerPage)
    })
}
