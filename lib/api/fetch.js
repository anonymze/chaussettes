export default async function fetch_api(query) {
  const res = await fetch('http://localhost/chaussette_api/wp-json/shopz/graphql', {
    method: 'POST',
    headers: {
      "mode": "cros",
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      query
    })
  });

  const json = await res.json();

  if (json.errors) {
    console.log(json.errors);
    return null;
  };

  return json.data.products.map((product) => {
    product.count = 1;
    return product
  });
}