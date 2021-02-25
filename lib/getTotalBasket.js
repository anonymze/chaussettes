export default function get_total_basket(products) {
    const sum_products = products.map((product) => product.price * product.count);
    return sum_products.reduce((a,b) => a + b, 0);
}