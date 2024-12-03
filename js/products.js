function loadProducts(products) {
    const productList = document.querySelector('.product-list .products');
    productList.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-buttons">
                    <button class="add-to-cart">Add to Cart</button>
                    <button class="view-detail" onclick="window.location.href = './product-detail.html?id=${product.id}'">View Detail</button>
                </div>
            </div>
            <h4 class="product-name">${product.name}</h4>
            <p class="product-price">${product.price}</p>
        `;
        productList.appendChild(productElement);
    });
}

function fetchProductsByCategory(category) {
    fetch(`http://localhost:3000/products?category=${category}`)
        .then(response => response.json())
        .then(products => {
            loadProducts(products);
        })
        .catch(error => console.error('Error fetching products by category:', error));
}

function fetchAllProducts() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        fetchProductsByCategory(category);
    } else {
        fetch(`http://localhost:3000/products`)
            .then(response => response.json())
            .then(products => {
                loadProducts(products);
            })
            .catch(error => console.error('Error fetching all products:', error));
    }
}

function filterProducts(category) {
    fetchProductsByCategory(category);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchAllProducts();
});