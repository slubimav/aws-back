import pkg from 'pg';
const { Client } = pkg;
import { dbOptions } from './dbOptions.js';
import { dbTables } from './dbTables.js';
import { httpStatus } from '../libs/httpStatus.js';

export const createNewProduct = async (title, description, price, count) => {
    
    const client = new Client(dbOptions);
    try{
        await client.connect();
    }catch(err){
        console.log("Error during db connection", err);
        client.end();
        return {status:httpStatus.SERVER_ERROR, message: "Error during db connection"};
    }

    try {
        await client.query('BEGIN')
        let query = {
            text: `INSERT INTO ${dbTables.PRODUCTS} (title, description, price) VALUES ($1, $2, $3) RETURNING id;`,
            values: [title, description, price],
        }
        const id = await client.query(query);

        if (count != undefined && count != ''){
            query = {
                text: `INSERT INTO ${dbTables.STOCKS} (product_id, count) VALUES ($1, $2)`,
                values: [id.rows[0].id, count],
            }

            await client.query(query);
        }
      
        await client.query('COMMIT')

        return {status:httpStatus.OK, message: {
            productId : id,
            title,
            description,
            price,
            count
        }};

      } catch (err) {
        await client.query('ROLLBACK')
        console.error("Error during db INSERT request, rollback...", err);
        return {status:httpStatus.SERVER_ERROR, message: "Error during db INSERT request, try again"};
      } finally {
        client.end();
      }

}