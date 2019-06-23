const products = [
  {
    name: "Sledgehammer",
    price: 125.76
  },
  {
    name: "Axe",
    price: 190.51
  },
  {
    name: "Bandsaw",
    price: 562.14
  },
  {
    name: "Chisel",
    price: 13.9
  },
  {
    name: "Hacksaw",
    price: 19.45
  }
].map((product, i) => ({
  ...product,
  id: i // Add id numbers to each product.
}));

const getProductById = id => {
  return products.find(product => product.id === id);
};

module.exports = {
  products,
  getProductById
};
