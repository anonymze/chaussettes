import fetch_api from './fetch.js';

export async function get_all_products() {
  const data = await fetch_api(`
  query {
    products {
      product_id
      name
      quantity
      is_on_sale
      description
      price
    }
  } 
      `)
  return data;
}