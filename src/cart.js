/* Carts are stored in server memory for the purposes of this demo.
 * In production code, carts would be stored in a database and old
 * carts would expire.
 */
const carts = {};

const round = number => Math.round(number * 100) / 100;

const formatCartFunction = getProductById => cart => {
  const items = Object.values(cart.items).map(item => ({
    ...getProductById(item.id),
    ...item,
    total: round(item.quantity * getProductById(item.id).price, 2)
  }));
  return {
    id: cart.id,
    items,
    total: round(items.reduce((a, item) => a + item.total, 0), 0)
  };
};

const newCart = (startId = 0) => {
  let id = startId;
  /* Cart id is a number for this demo so it's easier to enter by hand.
   * In production code, I would use a uuid to prevent users from seeing each
   * other's carts. Alternatively I can associate each cart with the user's account. 
   */
  for (let i = 0; i < 10000; i++) {
    if (!carts[id]) {
      // Find an unused cart number
      const newCart = {
        id,
        items: {}
      };
      carts[id] = newCart;
      return newCart;
    }
    id++;
  }
};

const getCart = (id = 0) => {
  return carts[id] || newCart(id);
};

const addProductToCart = (cartId, itemId, quantity = 1) => {
  const cart = getCart(cartId);
  const { items } = cart;
  const updatedItems = {
    ...items,
    [itemId]: {
      id: itemId,
      quantity: items[itemId] ? items[itemId].quantity + quantity : quantity
    }
  };

  const positiveItems = Object.keys(updatedItems).reduce((a, itemId) => {
    const item = updatedItems[itemId];
    if (item.quantity > 0) {
      return {
        ...a,
        [itemId]: item
      };
    }
    return a;
  }, {});

  const updatedCart = {
    id: cartId,
    items: positiveItems
  };
  carts[cartId] = updatedCart;
  return updatedCart;
};

module.exports = {
  formatCartFunction,
  newCart,
  getCart,
  addProductToCart
};
