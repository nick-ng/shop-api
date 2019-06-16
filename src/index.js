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

  type Item {
    id: Int
    name: String
    price: Float
    quantity: Int
    total: Float
  }

  type Cart {
    id: Int
    items: [Item]
    total: Float
  }

  type Query {
    products: [Product]
  }

  type Mutation {
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
