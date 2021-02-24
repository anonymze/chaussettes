import React, { useMemo } from 'react';
import { useGlobalContext } from '../context/state';
import Header from '../components/layout/Header'

// Queries
import { get_all_products } from '../api/queries';

// Components
import Card from '../components/Card';


export default function Home({ all_products }) {
  const [state, dispatch] = useGlobalContext();


  const add_to_basket = (product) => {    
    dispatch({
      count: ++state.count
    })

    if (state.infos.find((info) => {
      if (info.product_id == product.product_id) ++info.count;
      return info.product_id == product.product_id
    })) {      
    } else {
      dispatch(
        {        
          infos: [
            ...state.infos,
             product
            ]
        }
      );
    }   
  }

  return (
    <>
    <Header />
      <h1>NEXTJS FRONT END</h1>
      {'panier ' + state.count}
      {
        all_products.map(product => {
          return (
            <Card key={product.product_id} product={product} add_to_basket={add_to_basket} shopping />
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

