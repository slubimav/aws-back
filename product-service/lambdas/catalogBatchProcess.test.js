import * as AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';

jest.mock('../models/createNewProduct');

import {createNewProduct} from '../models/createNewProduct';
import { handler as catalogBatchProcess } from './catalogBatchProcess';
import { httpStatus } from '../libs/httpStatus';

AWSMock.setSDKInstance(AWS)

describe('catalogBatchProcess', () => {

  const validData = {
    Records :
       [
          {body:JSON.stringify({'title':'row1', description: 'desc1', price: 111, count: 1})},
          {body:JSON.stringify({'title':'row2', description: 'desc2', price: 222, count: 2})},
          {body:JSON.stringify({'title':'row3', description: 'desc3', price: 333, count: 3})},
        ]
  }

  it('should return call sns.publish and createNewProduct 3 times', async () => {

    // @ts-ignore
    createNewProduct.mockImplementation((title, description, price, count) => 'ok');

    const snsPublishMock = jest.fn((opt, cb) => cb(opt))

    AWSMock.mock('SNS', 'publish', snsPublishMock)
    
    await catalogBatchProcess(validData);

    AWSMock.restore('SNS');

    expect(snsPublishMock).toHaveBeenCalledTimes(validData.Records.length);

    expect(createNewProduct).toHaveBeenCalledTimes(validData.Records.length);

  }); 


   it('should return 500 error code if function raise error', async () => {

    AWSMock.mock('SNS', 'publish', (_operation, _params) => { throw new Error('Test error'); });
     
     const result = await catalogBatchProcess(validData);

     AWSMock.restore('SNS');

     expect(result.statusCode).toBe(httpStatus.SERVER_ERROR);

   }); 


});