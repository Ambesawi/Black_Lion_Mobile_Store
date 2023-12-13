// public/app.js
function loadProducts() {
    // Check if the product list is already loaded
    const productList = document.getElementById('product-list');
    if (productList.children.length > 0) {
        return;
    }

    // Fetch product data from the server
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            // Populate the product list
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const listItem = document.createElement('li');
                listItem.textContent = `${product.name} - $${product.price}`;
                productList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// You can also use an event listener to trigger the function on click
// document.getElementById('product-list-heading').addEventListener('click', loadProducts);

