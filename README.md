# shop-api

A simple catalog and shopping cart API. Access at https://shop-api.nick.ng

# Usage

1. `npm install` and `npm start` (or `npm run dev`)
2. Access at GraphQL playground at `localhost:3001`

Example queries and mutations:

```
mutation add1 {
  addProductToCart(cartId: 2, itemId: 0) {
    id
    items {
      id
      name
      price
      quantity
      total
    }
    total
  }
}

mutation remove1 {
  removeProductFromCart(cartId: 2, itemId: 0) {
    id
    items {
      id
      name
      price
      quantity
      total
    }
    total
  }
}

mutation add2 {
  addProductToCart(cartId: 2, itemId: 1) {
    id
    items {
      id
      name
      price
      quantity
      total
    }
    total
  }
}


mutation new {
  newCart {
    id
    items {
      id
      name
      price
    }
  }
}

mutation get {
  getCart(id: 2) {
    id
    items {
      id
      name
      price
      quantity
      total
    }
    total
  }
}

query products {
  products {
    id
    name
    price
  }
}
```
