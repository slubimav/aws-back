import {handler as getProductsList } from './getProductsList'
import genRequest from './rqStructure.js'
import productList from '../productList.json';

describe ('Fuction getProductsList ', () => {
	test('should has 200 OK, header(JSON type), and body', async () => {
		const event = genRequest({
			body: {productList}
			})

		const res = await getProductsList(event)
		const { body, headers, statusCode } = res

		expect(res).toBeDefined()
		expect(body || headers).toBeTruthy()
		expect(headers['Content-Type'] === 'application/json').toBeTruthy()
		expect(res.statusCode).toBe(200)
	})
})