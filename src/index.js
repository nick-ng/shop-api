require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");

const { formatCartFunction, getCart, addProductToCart } = require("./cart");

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

const formatCart = formatCartFunction(getProductById);

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    price: Float
  }

  "Products in the cart need more properties like quantity and total."
  type Item {
    id: Int
    name: String
    price: Float
    quantity: Int
    total: Float
  }

  """
  Cart id is a number for this demo so it's easier to enter by hand.
  In production code, I would use a uuid to prevent users from seeing each
  other's carts. Alternatively I can associate each cart with the user's account.
  """
  type Cart {
    id: Int
    items: [Item]
    total: Float
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    "Returns a cart with the specified id. If no cart exists, a new cart will be created."
    getCart(id: Int): Cart
    newCart: Cart
    addProductToCart(cartId: Int, itemId: Int): Cart
    removeProductFromCart(cartId: Int, itemId: Int): Cart
  }
`;

const resolvers = {
  Query: {
    products: () => products
  },
  Mutation: {
    newCart: () => formatCart(getCart()),
    getCart: (_, { id }) => formatCart(getCart(id)),
    addProductToCart: (_, { cartId, itemId }) =>
      formatCart(addProductToCart(cartId, itemId, 1)),
    removeProductFromCart: (_, { cartId, itemId }) =>
      formatCart(addProductToCart(cartId, itemId, -1))
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen({
    port: process.env.PORT || 3001
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
