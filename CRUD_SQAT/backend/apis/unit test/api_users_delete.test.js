const request = require('supertest');
const express = require('express');
const router = express.Router();
const nombre = require('../models/user_model');

const app = express();
app.use(express.json());
app.use('/your-route', router);

describe('CRUD Delete Endpoint', () => {
    nombre.findByIdAndRemove = jest.fn();

    beforeEach(() => {
        nombre.findByIdAndRemove.mockClear();
    });

    it('should delete a resource and return a success message', async () => {
        const idToDelete = '12345';

        nombre.findByIdAndRemove.mockResolvedValueOnce({ _id: idToDelete });

        const response = await request(app).delete(`../models/user_model`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: true, msj: 'Deleted' });
    });

    it('a 400 status code', async () => {
        const idToDelete = 'invalidId';

        nombre.findByIdAndRemove.mockRejectedValueOnce(new Error('Some error message'));

        const response = await request(app).delete(`../models/user_model`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual('Erros Some error message');
    });
});
