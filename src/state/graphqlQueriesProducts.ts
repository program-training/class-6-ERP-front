import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GetProducts {
  getProducts {
    message
    status
    products {
      product_id
      name
      sale_price
      quantity
      description
      category
      discount_percentage
      image_url
      image_alt
      is_for_sale
      cost_price
      supplier
    } 
  }
}
`;