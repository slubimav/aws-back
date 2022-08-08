import AWS from 'aws-sdk';
import { handleResponse } from '../libs/handleResponse';
import { httpStatus } from '../libs/httpStatus';
import {createNewProduct} from '../models/createNewProduct';

export const handler = async event => {
  
const { SNS_ARN, LOW_PRICE_LIMIT, HIGHT_PRICE_NOTIFICATION, LOW_PRICE_NOTIFICATION } = process.env;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
  
await asyncForEach(event.Records, async (record) => {

try {

      const messages = JSON.parse(record.body);

      console.log(messages);

      const priceNotification = messages.price > LOW_PRICE_LIMIT ? HIGHT_PRICE_NOTIFICATION : LOW_PRICE_NOTIFICATION;

      const {title, description, price, count } = messages;
   
      const resultCreateProduct = await createNewProduct(title, description, price, count );

      console.log(resultCreateProduct);

      let params = {
              
                Subject: `Product ${messages.title} added to db. Send ${priceNotification} notification`,
      
                Message: JSON.stringify(messages),
              
                TopicArn: SNS_ARN,
              
                MessageAttributes: {
              
                Price: {
              
                    DataType: 'String',
              
                    StringValue: priceNotification
                    },
                }
              };

// Create promise and SNS service object
let publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31', region: 'eu-central-1'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise
 .then( data => {
   console.log(`Product ${messages.title} added to database. Notification ${priceNotification} sent to the topic ${params.TopicArn}`)
   console.log("MessageID is " + data.MessageId) })
 .catch( error => console.log(error));


return handleResponse("done", httpStatus.OK);
  } catch (error) {
    return handleResponse(error, httpStatus.SERVER_ERROR);
  }
        });
}; 