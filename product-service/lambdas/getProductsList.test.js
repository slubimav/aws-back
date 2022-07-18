import {handler as getProductsList } from './getProductsList.js'
import genRequest from './rqStructure.js'
import productList from '../productList.json' assert {type: 'json'}
import { expect } from 'chai'

describe ('Fuction getProductsList ', () => {
	it('should has 200 OK, header(JSON type), and body', async () => {
		const event = genRequest({
			body: {productList}
			})

		const res = await getProductsList(event)
		const { body, headers, statusCode } = res

		expect(res).to.be.not.undefined
		expect(body || headers).to.be.not.undefined
		expect(headers['Content-Type'] === 'application/json').to.be.true
		expect(res.statusCode).to.equal(200)
	})
})