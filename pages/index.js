import React, { useMemo } from 'react';
import { useGlobalContext } from '../context/state'

// Queries
import { get_all_products } from '../api/queries';

// Components
import Card from '../components/Card'

export default function Home({ all_products }) {
  const [state, dispatch] = useGlobalContext();

  const add_to_basket = (product) => {
    dispatch(
      {
        count: ++state.count,
        infos: {
          ...product
        }
      }
    );
  }

  return (
    <>
      <h1>NEXTJS FRONT END</h1>
      {'panier ' + state.count}
      {console.log(state.infos)}
      {

        all_products.map(product => {
          return (
            <Card key={product.product_id} product={product} add_to_basket={add_to_basket} />
          )
        })
      }
    </>
  )
}

export async function getServerSideProps() {
  const all_products = await get_all_products();

  if (!all_products) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      all_products
    }
  }
}