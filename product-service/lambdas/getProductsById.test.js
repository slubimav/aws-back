import {handler as getProductsById } from './getProductsById'
import genRequest from './rqStructure.js'
import productList from '../productList.json';

describe('Function getProductsById',()=>{
	test('should return product with first-product-id', async ()=> {
		const firstProduct  = productList[0]
		
		const event = genRequest({
      		pathParametersObject: {
        	productId: firstProduct.id,
      },
    });

    const res = await getProductsById(event);
    const receivedData = JSON.parse(res.body);

    expect(res).toBeDefined();
    expect(receivedData).toEqual(firstProduct);
    expect(res.statusCode).toBe(200);
  });
  test('should return an error =Product not found= for random id (for exemple id=777)', async ()=>{
    const failId = '777'

    const event = genRequest({
      pathParametersObject: {
        productId: failId
      },
    })

    const res = await getProductsById(event);
    const {message} = JSON.parse(res.body) || {}

    expect(res.statusCode).toBe(404)
    expect(message).toEqual('Error: Product not found!')

    })
  })