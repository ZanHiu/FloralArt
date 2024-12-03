function fetchProductById(id) {
 // Gửi yêu cầu GET đến server để lấy thông tin sản phẩm theo id
 fetch(`http://localhost:3000/products/${id}`)
  .then(response => response.json())
  .then(data => {
   window.location.href = `product-detail.html?id=${id}`;
  })
  .catch(error => console.error(error));
}

function loadProductDetail() {
 const productId = new URLSearchParams(window.location.search).get('id');
 if (productId) {
   fetch(`http://localhost:3000/products/${productId}`)
     .then(response => response.json())
     .then(data => {
       const detailContainer = document.getElementById('detail-container');
       detailContainer.innerHTML = `
         <div class="detail-image">
           <img src="${data.image}" alt="${data.name}">
         </div>
         <div class="detail-info">
           <h2 class="detail-name">${data.name}</h2>
           <p class="detail-price">${data.price}</p>
           <div class="quantity-wrapper">
             <label for="quantity">Số lượng:</label>
             <input type="number" id="quantity" value="1" min="1">
           </div>
           <div class="detail-description">
             <h4>Description</h4>
             <p>${data.description}</p>
           </div>
         </div>
       `;
     })
     .catch(error => console.error(error));
 }
}

loadProductDetail();