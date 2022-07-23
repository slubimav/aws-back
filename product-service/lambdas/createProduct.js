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


  try {
      
      const { title, description, price, count } = JSON.parse(event.body);
      
      if (typeof title === 'undefined' || title === '') { data_export = 'Not valid data for product creation' ; statusCode = 400; return handleResponse(data_export, statusCode); }

      await client.query('BEGIN');

      const queryProduct = 'INSERT INTO products(title, description, price) VALUES($1, $2, $3) RETURNING id';

      const valuesProduct = [title, description, price];

      const queryStock = 'INSERT INTO stocks(product_id, count) VALUES($1, $2)';

      const {rows: products} = await client.query(queryProduct, valuesProduct);

      const productId = products[0].id;

      const countStock = [productId, count];

      await client.query(queryStock, countStock);
    
      console.log("Product created:" + productId);
    
      await client.query('COMMIT');
    
      data_export = {
                    title,
                    description,
                    price,
                    count,
                    id: productId,
                    };
      
      statusCode = 200;

      } catch (err) {
    
      data_export = 'DB insert error 500:' + err; statusCode = 500;

      await client.query('ROLLBACK');
    
      throw new Error('Failed to create product in database + ' + err);
  
      } finally {
    
      client.end();

      return handleResponse(data_export, statusCode);
      
      }
};