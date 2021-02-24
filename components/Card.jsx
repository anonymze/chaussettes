export default function Card({product, add_to_basket, shopping}) {  
    return(
        <div>
        <h3>{product.name}</h3>
        { (product.description) ? <img src={product.description.split('"')[1]} /> : ''}
        {(shopping) ? product.quantity : '' }
        <p>{(product.is_on_sale) ? "En promotion" : "Pas en promotion"}</p>
        <p>{product.price}</p>
        {(shopping) ? <button onClick={() => add_to_basket(product)}>Ajouter au panier</button> : "nombre de produits dans le panier: " + product.count }
      </div>
    )
}