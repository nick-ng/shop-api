require("dotenv").config();
const { ApolloServer, gql } = require("apollo-server");

const { products, getProductById } = require("./products");
const { formatCartFunction, getCart, addProductToCart } = require("./cart");

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
  resolvers,
  introspection: true,
  playground: true
});

server
  .listen({
    port: process.env.PORT || 3001
  })
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
  });
