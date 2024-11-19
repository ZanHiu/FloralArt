// Sticky scrolled
window.onscroll = function () {
  const header = document.querySelector('#header');
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

// Update cart
document.querySelectorAll('.remove-btn').forEach(button => {
  button.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      cartItem.remove();
      updateTotal();
  });
});

document.querySelectorAll('.item-quantity').forEach(input => {
  input.addEventListener('change', function() {
      updateTotal();
  });
});

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;
  cartItems.forEach(item => {
      const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
      const quantity = parseInt(item.querySelector('.item-quantity').value);
      total += price * quantity;
  });
  document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}