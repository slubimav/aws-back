import { createNewProduct } from '../models/createNewProduct';
import { handleResponse } from '../libs/handleResponse';
import { httpStatus } from '../libs/httpStatus';

export const handler = async event => {
  
  console.log(event);

try{

    const { title, description, price, count } = JSON.parse(event.body);
   
    const resultCreateProduct = await createNewProduct(title, description, price, count);

    return handleResponse(JSON.stringify(resultCreateProduct.message), resultCreateProduct.status);

  }catch(err){
      return handleResponse("Error during createProduct function execution", httpStatus.SERVER_ERROR);
  }
};