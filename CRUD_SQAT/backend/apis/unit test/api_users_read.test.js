const request = require('supertest');
const express = require('express');
const app = express();
const express = require('express');
const router = express.Router();
const user_model = require('../models/user_model');


router.put('/:id', async (req, resp) => {
    try {
        const { name, last_name, username, email } = req.body;
        const newName = { name, last_name, username, email };
        await user_model.findByIdAndUpdate(req.params.id, newName);
        resp.json({
            status: true,
            msj: 'Active',
        });
    } catch (err) {
        resp.status(400).json('Error ' + err);
    }
});

app.use('/', router);

describe('Update User Route', () => {
    it('should update a user by ID and return a success message', async () => {
        // Mock the user_model.findByIdAndUpdate method to resolve successfully
        user_model.findByIdAndUpdate = jest.fn().mockResolvedValueOnce();

        const userId = '6506c48c8772c34cb4cd2cae'; // MongoDb ObjectID
        const updatedData = {
            name: 'UpdatedAgzam',
            code: 'UpdatedCode',

        };

        const response = await request(app)
            .put(`/${userId}`)
            .send(updatedData);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            msj: 'Active',
        });
    });

    it('should handle errors when updating a user by ID', async () => {
        user_model.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error('Database error'));

        const userId = '6506c48c8772c34cb4cd2cae'; // MongoDb ObjectID
        const updatedData = {
            name: 'UpdatedAgzam',
            code: 'UpdatedCode',

        };


        const response = await request(app)
            .put(`/${userId}`)
            .send(updatedData);

        expect(response.status).toBe(400);
        expect(response.body).toBe('Error Database error');
    });
});
