import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-central-1' });
let resault = undefined, stCode = 0;


export const handler = async event => {

	console.log(event);
 	
  if (!event || !event.queryStringParameters || !event.queryStringParameters.name) {
        resault = { message: 'Bad request' }, stCode = 400;
  
  } else {
  
          let fileName = event.queryStringParameters.name;
          
          const BACKET = process.env.BUCKET; //BUCKET_NAME

          const catalogPath = `uploaded/${fileName}`; // FILE_NAME

          const signedUrlExpireSeconds = 60*5; //EXPIRATION

          const bucketParams = { 
            Bucket: BACKET, 
            Key: catalogPath, 
            ContentType: 'text/csv',
            Expires: signedUrlExpireSeconds}

          const s3 = new AWS.S3({apiVersion: '2006-03-01'});
  
          try {
            
            const url = s3.getSignedUrl('putObject', bucketParams);
            
            console.log(`Getting signedUrl to put "${catalogPath}" to "${bucketParams.Bucket}".\nSinedURL :`, url);
      
            resault = url; stCode = 202;
        
          } catch (err) {
            
            console.log("Error during presigned URL", err);
      
            resault = null; stCode = 500;
          }
  }

  let response = {
                  statusCode: stCode,
    	            headers: {
			                       'Access-Control-Allow-Origin': '*',
    			                   'Access-Control-Allow-Credentials': true,
  				                 },
  		            body: resault,
                  isBase64Encoded: false
                };

  return response;

};