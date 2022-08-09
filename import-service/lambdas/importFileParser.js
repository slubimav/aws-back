import AWS from 'aws-sdk';
import parse from 'csv-parser';

AWS.config.update({ region: 'eu-central-1' });

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const sqs = new AWS.SQS();

export const handler = async event => {

  const BUCKET = event.Records[0].s3.bucket.name;

  const sendMessageToSQS = async (sqs, messageBody) => {
  await sqs.sendMessage(
    {
      QueueUrl: process.env.SQS_URL,
      MessageBody: messageBody,
    },
    (error, data) => {
      if (error) {
        console.log('SQS error: ', error);
        throw Error(error);
      }
      console.log(`Send message to SQS:`, JSON.stringify(data));
    },
  );
};


  let resault =[], stCode = '', number_of_records=0;
  
  try {
    for (const record of event.Records) {

      let key = record.s3.object.key,
          param = { Bucket: BUCKET, Key: key };

      s3.getObject(param).createReadStream()
        .pipe(parse())
        .on('data', (csvline) => { 
          // console.log(csvline); 
          resault.push(csvline);
          number_of_records +=1;
          sendMessageToSQS(sqs, JSON.stringify(csvline));
           }) 
        .on('error', (error) => { console.log(error); stCode = 500; resault = null; })
        .on('end', () => { 
                          stCode = 200; 
                          console.log('Parsing and sending to SQS are COMPLETE.');
                          sendMessageToSQS(sqs, JSON.stringify({ 'parsed' : number_of_records })) } )

      let paramCopy = {
          Bucket: BUCKET, 
          CopySource: `${BUCKET}/${record.s3.object.key}`, 
          Key: record.s3.object.key.replace('uploaded', 'parsed')
        };
        
      let paramDelete = {
          Bucket: BUCKET, 
          Key: record.s3.object.key, 
        };        

        await s3.copyObject(paramCopy).promise();
        await s3.deleteObject(paramDelete).promise();
    }
  } catch (error) {
    
    console.log(error);
    stCode = 500;
  }
  
  return { statusCode: stCode }
}