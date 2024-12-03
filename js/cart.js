document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const productElement = this.closest('.product'); // Lấy phần tử sản phẩm gần nhất
    const productName = productElement.querySelector('.product-name').textContent; // Tên sản phẩm
    const productPrice = productElement.querySelector('.product-price').textContent; // Giá sản phẩm
    const productImage = productElement.querySelector('img').src; // Hình ảnh sản phẩm

    const cartItem = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    // Gửi dữ liệu tới JSON server để thêm vào giỏ hàng
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItem),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Thêm sản phẩm vào giỏ hàng thành công');
        loadCart(); // Tải lại giỏ hàng sau khi thêm sản phẩm
      })
      .catch((error) => {
        alert('Thêm sản phẩm vào giỏ hàng thất bại');
        console.error("Error:", error);
      });
  });
});

// Hàm để tải giỏ hàng từ db.json khi trang được tải
function loadCart() {
  fetch("http://localhost:3000/cart")
    .then(response => response.json())
    .then(cartItems => {
      const cartItemsContainer = document.querySelector('.cart-items');
      cartItemsContainer.innerHTML = '';
      
      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Giỏ hàng trống!</div>'; // Thông báo giỏ hàng trống
        document.querySelector('.cart-total').style.display = 'none';
        document.querySelector('#check-out').style.display = 'none';
      } else {
        cartItems.forEach(item => {
          const cartItem = document.createElement('li');
          cartItem.classList.add('cart-item');
          cartItem.setAttribute('data-id', item.id); // Lưu ID sản phẩm để xóa
          cartItem.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-price" data-price="${item.price.replace(/[^0-9.-]+/g, "")}">${item.price}</div>
            </div>
            <div class="item-action">
                <input type="number" class="item-quantity" value="1" min="1">
                <button class="remove-btn">Delete</button>
            </div>
          `;
          cartItemsContainer.appendChild(cartItem);
        });
        updateTotalPrice(); // Cập nhật tổng giá trị giỏ hàng
        attachEventListeners(); // Gắn sự kiện cho các sản phẩm trong giỏ hàng
      }
    })
    .catch(error => console.error('Error:', error));
}

// Hàm để cập nhật tổng giá trị giỏ hàng
function updateTotalPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  const totalPriceElement = document.getElementById('total-price'); // Lấy phần tử tổng giá
  let total = 0;

  cartItems.forEach(item => {
    const priceElement = item.querySelector('.item-price');
    const quantityInput = item.querySelector('.item-quantity');

    if (quantityInput) {
      const price = parseFloat(priceElement.getAttribute('data-price'));
      const quantity = parseInt(quantityInput.value);
      total += price * quantity;
    }
  });

  totalPriceElement.innerText = `RP ${total.toLocaleString()}`; // Cập nhật hiển thị tổng giá
}

// Hàm để gắn sự kiện cho các sản phẩm trong giỏ hàng
function attachEventListeners() {
  const cartItems = document.querySelectorAll('.cart-item');

  cartItems.forEach(item => {
      const quantityInput = item.querySelector('.item-quantity');
      if (quantityInput) {
          quantityInput.addEventListener('change', updateTotalPrice); // Theo dõi sự thay đổi số lượng
      }

      const removeButton = item.querySelector('.remove-btn');
      if (removeButton) { // Kiểm tra xem removeButton có tồn tại không
          removeButton.addEventListener('click', function () {
              const itemId = item.getAttribute('data-id'); // Lấy ID sản phẩm để xóa
              fetch(`http://localhost:3000/cart/${itemId}`, {
                  method: 'DELETE',
              })
              .then(response => {
                  if (response.ok) {
                      item.remove(); // Xóa sản phẩm khỏi giỏ hàng
                      updateTotalPrice(); // Cập nhật tổng giá
                  } else {
                      alert('Xóa sản phẩm thất bại');
                  }
              })
              .catch(error => {
                  console.error('Error:', error);
                  alert('Xóa sản phẩm thất bại');
              });
          });
      }
  });
}

// Gọi hàm loadCart khi trang được tải
loadCart(); // Gọi hàm này để tải giỏ hàng trên tất cả các trang