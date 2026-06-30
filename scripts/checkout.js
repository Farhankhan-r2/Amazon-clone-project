import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { products } from '../data/products.js';
import { cart, removeFromCart } from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
function renderOrderSummary() {
  let orderSummary = ``;
  const today = dayjs();
  const dateString = today.format('dddd, MMMM  D');
  cart.forEach((cartItem) => {
    let matchingProduct = products.find(product => product.id === cartItem.productId);
    if (matchingProduct) {
      orderSummary += `
    <div class="cart-item-container">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                 $${(matchingProduct.priceCents * cartItem.quantity / 100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-btn " data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
           ${renderDeliveryOptions(matchingProduct.id, cartItem)}
            </div>
          </div>
        </div>
   `;

    }
  });
  document.querySelector('.js-order-summary').innerHTML = orderSummary;
};
renderOrderSummary();
function renderDeliveryOptions(productIdPram, cartItemPram) {
  let html = ``;
  const today = dayjs();
  deliveryOptions.forEach((option) => {
    const deliveryDate = today.add(option.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM  D');
    const priceString = option.priceCents === 0 ? 'FREE' : `$${(option.priceCents / 100).toFixed(2)}-`;

    const isChecked = option.id === cartItemPram.deliveryOptionId;

    html +=
      `
        <div class="delivery-option">
                <input type="radio" 
                  ${isChecked ? 'checked' : ''}
                class="delivery-option-input" 
                name="delivery-option-${productIdPram}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
         </div>
    `

  });

  return html;
}

document.querySelectorAll('.js-delete-btn').forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', () => {
    removeFromCart(deleteBtn);
  });

});
