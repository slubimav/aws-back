import products from '../productList.json' assert {type: 'json'};


const handleResponse = (products = {}, status = 200) => ({
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
    body: JSON.stringify(products),
  });
  

export const handler = async event => {
        const { productId } = event.pathParameters || {};
        const product = await products.find(({ id }) => id === productId);
        if (!product)   { return handleResponse({ message: 'Error: Product not found!' }, 404);
          }
    return handleResponse({ ...product }, 200);
};