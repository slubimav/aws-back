import * as S3 from 'aws-sdk/clients/s3';
import parse from 'csv-parser';

export const handler = async event => {

  const BUCKET = event.Records[0].s3.bucket.name;

  const s3 = new S3({region: 'eu-central-1'});

  let resault =[], stCode = '';
  
  try {
    for (const record of event.Records) {

      let key = record.s3.object.key,
          param = { Bucket: BUCKET, Key: key };

      s3.getObject(param).createReadStream()
        .pipe(parse())
        .on('data', (csvline) => { console.log(csvline); resault.push(csvline) }) 
        .on('error', (error) => { console.log(error); stCode = 500; resault = null; })
        .on('end', () => { stCode = 200; console.log('Reading complete.') } )

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