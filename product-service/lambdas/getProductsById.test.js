import {handler as getProductsById } from './getProductsById.js';
import genRequest from './rqStructure.js'
import productList from '../productList.json' assert {type: 'json'};
import { expect } from 'chai';

describe('Function getProductsById',()=>{
	it('should return product with first-product-id', async ()=> {
		const firstProduct  = productList[0]
		
		const event = genRequest({
      		pathParametersObject: {
        	productId: firstProduct.id,
      },
    });

    const res = await getProductsById(event);
    const receivedData = JSON.parse(res.body);

    expect(res).to.be.not.undefined
    expect(receivedData).to.deep.equal(firstProduct);
    expect(res.statusCode).to.equal(200);
  });
  it('should return an error =Product not found= for random id (for exemple id=777)', async ()=>{
    const failId = '777'

    const event = genRequest({
      pathParametersObject: {
        productId: failId
      },
    })

    const res = await getProductsById(event);
    const {message} = JSON.parse(res.body) || {}

    expect(res.statusCode).to.equal(404)
    expect(message).to.equal('Error: Product not found!')

    })
  })