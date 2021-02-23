

export default function Card({product, add_to_basket}) {  
    return(
        <div>
        <h3>{product.name}</h3>
        { (product.description) ? <img src={product.description.split('"')[1]} /> : ''}
        <p>quantité: {product.quantity}</p>
        <p>{(product.is_on_sale) ? "En promotion" : "Pas en promotion"}</p>
        <p>{product.price}€</p>
        <button onClick={() => add_to_basket(product)}>Ajouter au panier</button>
      </div>
    )
}