export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  const matchingItem = cart.find(
    item => item.productId === productId
  );
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
};

export function removeFromCart(deleteBtn) {
  const deleteBtnId = deleteBtn.dataset.productId;
  const removeProduct = cart.find(item => item.productId === deleteBtnId);
  if (removeProduct.quantity) {
    if (removeProduct.quantity === 1) {
      const index = cart.findIndex(item => item.productId === deleteBtnId);
      cart.splice(index, 1);
    } else {
      removeProduct.quantity--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();

  };

};