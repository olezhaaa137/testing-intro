function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if(quantity <= 0 || quantity > product.stock) {
    throw new RangeError();
  }
  const resultedCart = [...cart];
  let found = false;
  for (let i = 0; i < cart.length; i += 1) {
    if (resultedCart[i].id === product.id) {
      found = true;
      if(resultedCart[i].quantity + quantity > product.stock) {
        throw new RangeError();
      }
      
      resultedCart[i] = {...resultedCart[i], quantity: quantity + resultedCart[i].quantity};
      break;
    }
  }

  if(!found) {
    resultedCart.push({...product, quantity: quantity});
  }
  return resultedCart;
}
function changeQuantity(cart, productId, quantity) {
  if(quantity <= 0) {
    throw new RangeError();
  }
  const resultedCart = [...cart];
  //let found = false;
  for (let i = 0; i < cart.length; i += 1) {
    if (resultedCart[i].id === productId) {
      //found = true;
      if(quantity > resultedCart[i].stock) {
        throw new RangeError();
      }

      resultedCart[i] = {...resultedCart[i], quantity: quantity};
      break;
    }
  }

  return resultedCart;
}
function removeFromCart(cart, productId) {
  const resultedCart = [...cart];
  const indexOfEl = resultedCart.findIndex((el) => el.id === productId);
  if(indexOfEl === -1) {
    return resultedCart;
  }

  resultedCart.splice(indexOfEl, 1);

  return resultedCart;
}

function calculateCartSubtotal(cart) { 
  let total = 0;
  for(let i = 0; i < cart.length; i += 1) {
    total += cart[i].quantity * cart[i].price;
  }

  return total;
 }
function calculateOrderTotal(cart, promo) {
  let subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  let delivery = 30000;
  if(promo === 'SAVE10' && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  if(subtotal > 50000) {
    delivery = 0;
  }
  let total = subtotal - discount + delivery;
  return {subtotal: subtotal, discount: discount, delivery: delivery, total: total};
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
