export const showToast = (message) => {
  const toastContainer = document.getElementById('toast-container') || (() => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
    return container;
  })();

  const toast = document.createElement('div');
  toast.className = 'toast align-items-center text-bg-danger border-0 show';
  toast.role = 'alert';
  toast.ariaLive = 'assertive';
  toast.ariaAtomic = 'true';
  toast.style.minWidth = '250px';
  toast.style.marginBottom = '0.5rem';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 5000);
};


const handleApiErrors = (response) => {
  if (!response.ok) {
    return response.text().then((text) => {
      const message = text.includes('<!doctype') ? 'API endpoint not found' : 'Unexpected error occurred';
      showToast(message);
      throw new Error(message);
    });
  }
  return response.json();
};



export {handleApiErrors}