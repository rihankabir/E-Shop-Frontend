document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.btn-primary');

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.card');
      const name = card.querySelector('.card-title').innerText;
      const price = parseFloat(card.querySelector('.fw-bold').innerText.replace('$', ''));
      const image = card.querySelector('img').src;
      const qty = parseInt(card.querySelector('.quantity-input').value);

      const product = { name, price, image, qty };

      // Load cart from localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if product already exists in cart
      const existingProduct = cart.find(item => item.name === product.name);
      if (existingProduct) {
        existingProduct.qty += product.qty;
      } else {
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    });
  });

  // Clear button functionality (optional)
  const clearButtons = document.querySelectorAll('.btn-outline-danger');
  clearButtons.forEach(button => {
    button.addEventListener('click', function () {
      const qtyInput = this.closest('.card').querySelector('.quantity-input');
      qtyInput.value = 1;
    });
  });
});

  

  // Load cart from localStorage
  function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const tbody = document.getElementById('cart-items');
    tbody.innerHTML = '';

    cartItems.forEach((item, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <img src="${item.image}" alt="${item.name}" class="img-thumbnail me-2" style="width: 80px;">
          <span class="product-name">${item.name}</span>
        </td>
        <td class="product-price">$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" class="form-control product-qty" value="${item.qty}" min="1" data-index="${index}" style="width: 80px;">
        </td>
        <td class="product-total">$${(item.price * item.qty).toFixed(2)}</td>
        <td>
          <button class="btn btn-danger btn-sm remove-btn" data-index="${index}">Remove</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    updateCartTotal();
  }

  function updateCartTotal() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cartItems.forEach(item => {
      subtotal += item.price * item.qty;
    });

    document.getElementById("cart-subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  }

  document.addEventListener("input", function(e) {
    if (e.target.classList.contains("product-qty")) {
      const index = e.target.dataset.index;
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems[index].qty = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    }
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      cartItems.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      loadCart();
    }
    if (e.target.id === "clear-cart") {
      localStorage.removeItem('cart');
      loadCart();
    }
  });

  window.onload = loadCart;


  function addToCart(button) {
    const card = button.closest('.card');
    const title = card.querySelector('.card-title').innerText;
    const quantity = card.querySelector('.quantity-input').value;
    alert(`Added ${quantity} x ${title} to cart.`);
    // Add your cart logic here
  }

  function clearQuantity(button) {
    const input = button.closest('.card').querySelector('.quantity-input');
    input.value = 1;
  }

