import pg from 'pg';
const { Client } = pg;

const handleResponse = (products = {}, status = 200) => ({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': '*',
  },
  statusCode: status,
  body: JSON.stringify(products),
});

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const credentials = {
  user: PG_USERNAME,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

let data_export = {}, statusCode = 200;

export const handler = async event => {
  
  console.log(event);

  const { productId } = event.pathParameters || {};

  const client = new Client(credentials);

  client.on('error', err => {
                            data_export = 'DB Client Error 500:' + err.stack;
                            statusCode = 500;
                            console.error('DB Client Error 500:', err.stack);
                            })

  await client
          .connect()
          .then(() => console.log('Client connected'))
          .catch(err => {data_export = 'DB connection error:' + err.stack; statusCode = 500})


 await client
          .query(`SELECT products.*, stocks.count \
                        FROM products LEFT JOIN stocks \
                        ON products.id = stocks.product_id\
                        WHERE products.id='${productId}'`)

          .then(res => { data_export = res.rows })
          .catch(err => { data_export = 'DB query error 500:' + err.stack; statusCode = 500})   
  
  await client
          .end()
          .then(() => console.log('Client disconnected'))
          .catch(err => {data_export = 'DB disconnection error 500:' + err.stack; statusCode = 500})

  if (JSON.stringify(data_export) == JSON.stringify([])) { data_export = 'Product not found 400: Wrong id'; statusCode = 400 }

  return handleResponse(data_export, statusCode);
}