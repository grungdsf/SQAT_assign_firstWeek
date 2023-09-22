const request = require('supertest')

const app = require('../../App')
const crud = require('../mock.json')

const endpointURL = '/crud_routers/'

describe(endpointURL, () => {
    it(`POST ${endpointURL}`, async () => {
        const response = await request(app).post(endpointURL).send(crud)
        expect(response.statusCode).toBe(201)
        expect(response.body.title).toBe(crud.title)
        expect(response.body.done).toBe(crud.done)
    })

    it(`should return error 500 with ${endpointURL}`, async () => {
        const response = await request(app)
            .post(endpointURL)
            .send({ title: 'Missing done' })
        expect(response.statusCode).toBe(500)
        expect(response.body).toStrictEqual({
            message: 'Validation failed: done',
        })
    })
})