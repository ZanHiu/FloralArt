function loadOrder() {
  fetch('http://localhost:3000/order')
    .then(response => response.json())
    .then(data => {
      const orderItems = data;
      console.log(orderItems);
      const orderContainer = document.querySelector('.order-items');
      orderContainer.innerHTML = '';
      orderItems.forEach(data => {
        Object.keys(data).forEach(key => {
          if (key !== 'id') {
            const item = data[key];
            const orderItem = document.createElement('li');
            orderItem.classList.add('order-item');
            orderItem.innerHTML = `
              <div class="item-image">
              <img src="${item.image}" alt="${item.name}">
              </div>
              <div class="item-info">
              <div class="item-name">${item.name}</div>
              <div class="item-price" data-price="${item.price}">${item.price}</div>
              </div>
              <div class="item-action">
              <input type="number" class="item-quantity" value="1" min="1">
              <button class="remove-btn">Delete</button>
              </div>
            `;
            orderContainer.appendChild(orderItem);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

loadOrder();