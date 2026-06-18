export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};