export const GET_PRODUCTS_QUERY = `
  query getProducts {
    products(first: 250) {
      nodes {
        id
        title
        variants(first: 10) {
          nodes {
            id
            title
            inventoryQuantity
          }
        }
      }
    }
  }
`;