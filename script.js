document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');
  const loadingElement = document.getElementById('loading');

  // DummyJSON API
  const API_URL = 'https://dummyjson.com/products?limit=35';

  async function fetchCardsData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);
      
      const data = await response.json();
      
      if (!data.products || data.products.length === 0) {
        throw new Error('Koi product nahi mila');
      }

      renderCards(data.products);
    } catch (error) {
      console.error('API Error:', error);
      loadingElement.innerHTML = `
        <div class="text-center text-danger my-5">
          <i class="bi bi-exclamation-triangle-fill display-4"></i>
          <h4 class="mt-3">Data Load Nahi Ho Saka</h4>
          <p class="text-muted">${error.message}</p>
          <button onclick="location.reload()" class="btn btn-outline-primary mt-2">Retry Karein</button>
        </div>
      `;
    }
  }

  function renderCards(products) {
    loadingElement.style.display = 'none';
    cardsContainer.innerHTML = '';

    products.forEach((product) => {
      const truncatedDesc = product.description.length > 80 
        ? product.description.substring(0, 80) + '...' 
        : product.description;

      const cardHtml = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card custom-card h-100">
            <div class="card-img-wrapper">
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" loading="lazy">
              <span class="price-badge">$${product.price}</span>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
              <div>
                <small class="text-uppercase text-muted fw-bold">${product.category}</small>
                <h5 class="card-title mt-1 text-truncate">${product.title}</h5>
                <p class="card-text">${truncatedDesc}</p>
              </div>
              <div class="pt-3 border-top mt-3 d-flex justify-content-between align-items-center">
                <div class="text-warning small">
                  <i class="bi bi-star-fill"></i>
                  <span class="fw-bold text-dark ms-1">${product.rating}</span>
                </div>
                <button class="btn btn-accent btn-sm">View Details</button>
              </div>
            </div>
          </div>
        </div>
      `;

      cardsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  fetchCardsData();
});
document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards-container');
  const loadingElement = document.getElementById('loading');

  // Limit ko 36 kar diya hai taake grid completely fill ho jaye (4 x 9 = 36)
  const API_URL = 'https://dummyjson.com/products?limit=36';

  async function fetchCardsData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API fetch error');
      
      const data = await response.json();
      renderCards(data.products);
    } catch (error) {
      console.error(error);
      loadingElement.innerHTML = `
        <div class="text-center text-danger my-5">
          <p>Data load karne mein masla aaya. Refresh karein!</p>
        </div>
      `;
    }
  }

  function renderCards(products) {
    loadingElement.style.display = 'none';
    cardsContainer.innerHTML = '';

    products.forEach((product) => {
      const cardHtml = `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card custom-card h-100">
            <div class="card-img-wrapper">
              <span class="price-badge">$${product.price}</span>
              <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" loading="lazy">
            </div>
            <div class="card-body d-flex flex-column justify-content-between p-3">
              <div>
                <span class="category-tag text-uppercase">${product.category}</span>
                <h5 class="card-title text-truncate">${product.title}</h5>
                <p class="card-text mb-0">${product.description}</p>
              </div>
              <div class="card-footer-custom mt-3 d-flex justify-content-between align-items-center">
                <div class="rating-box d-flex align-items-center gap-1">
                  <i class="bi bi-star-fill"></i>
                  <span>${product.rating}</span>
                </div>
                <button class="btn btn-accent">
                  View Details <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      cardsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
  }

  fetchCardsData();
});