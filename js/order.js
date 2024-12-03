document.querySelector('#check-out').addEventListener('click', function () {
 fetch('http://localhost:3000/cart')
  .then(response => response.json())
  .then(data => {
   const cartItems = data;
   fetch('http://localhost:3000/order', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
   })
    .then(response => {
     if (response.ok) {
      window.location.href = 'checkout.html';
     } else {
      console.error('Failed to add order');
     }
    })
    .catch(error => {
     console.error('Error:', error);
    });
  })
  .catch(error => {
   console.error('Error:', error);
  });
});