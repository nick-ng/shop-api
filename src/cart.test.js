const { getProductById } = require("./products");
const cart = require("./cart");

const exampleCart = {
  id: 2,
  items: {
    "0": {
      id: 0,
      quantity: 1
    },
    "1": {
      id: 1,
      quantity: 3
    },
    "4": {
      id: 4,
      quantity: 2
    }
  }
};

describe("#cart.js", () => {
  describe("formatCartFunction", () => {
    const formattedCart = cart.formatCartFunction(getProductById)(exampleCart);
    it("should return items as an array.", () => {
      expect(formattedCart.items).to.be.an("array");
    });

    it("should calculate total per item", () => {
      expect(formattedCart.items[0].total).to.equal(125.76);
      expect(formattedCart.items[1].total).to.equal(571.53);
      expect(formattedCart.items[2].total).to.equal(38.9);
    });

    it("should calculate the cart's total", () => {
      expect(formattedCart.total).to.equal(736.19);
    });
  });

  describe("newCart", () => {
    it("should return carts with different ids on successive calls.", () => {
      const cart1 = cart.newCart();
      const cart2 = cart.newCart();
      expect(cart1.id).to.not.equal(cart2.id);
    });
  });

  describe("getCart", () => {
    it("should return the specified cart.", () => {
      const cart1 = cart.getCart(1);
      const cart2 = cart.getCart(2);
      expect(cart1.id).to.equal(1);
      expect(cart2.id).to.equal(2);
    });

    it("should create a new cart when the requested cart doesn't exist", () => {
      const cart100 = cart.getCart(100);
      expect(cart100.id).to.equal(100);
    });
  });

  describe("addProductToCart", () => {
    it("should add items to the cart.", () => {
      const cart1 = cart.addProductToCart(1, 1);
      expect(cart1.items[1].id).to.equal(1);
      expect(cart1.items[1].quantity).to.equal(1);
    });

    it("should increase the quantity of an item.", () => {
      cart.addProductToCart(2, 1);
      const cart2 = cart.addProductToCart(2, 1);
      expect(cart2.items[1].quantity).to.equal(2);
    });

    it("should lower the quantity of items in the cart when removing", () => {
      cart.addProductToCart(3, 1);
      cart.addProductToCart(3, 1);
      const cart3 = cart.addProductToCart(3, 1, -1);
      expect(cart3.items[1].quantity).to.equal(1);
    });

    it("should remove the item completely when removing last", () => {
      cart.addProductToCart(4, 1);
      cart.addProductToCart(4, 1);
      cart.addProductToCart(4, 1, -1);
      const cart4 = cart.addProductToCart(4, 1, -1);
      expect(cart4.items[1]).to.be.undefined;
    });

    it("should not have negative quantity", () => {
      cart.addProductToCart(5, 1);
      cart.addProductToCart(5, 1, -1);
      const cart5 = cart.addProductToCart(5, 1, -1);
      expect(cart5.items[1]).to.be.undefined;
    });
  });
});
