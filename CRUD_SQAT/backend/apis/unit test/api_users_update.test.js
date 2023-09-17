const request = require('supertest');
const express = require('express');
const app = express();
const router = express.Router();
const user_model = require('../models/user_model');

router.post('/', async (req, resp) => {
    try {
        const { name, code } = req.body;
        const obj = new user_model({ name, code  });
        await obj.save();
        resp.json({
            status: true,
            msj: 'Value Saved',
        });
    } catch (err) {
        resp.status(400).json('Error ' + err);
    }
});

app.use('/', router);

describe('Create User Route', () => {
    it('should create a user and return a success message', async () => {
        // Mock the user_model.save method to resolve successfully
        user_model.prototype.save = jest.fn().mockResolvedValueOnce();

        const newUser = {
            name: 'Agzam',
            code: '111',
        };

        const response = await request(app)
            .post('/')
            .send(newUser);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: true,
            msj: 'Value Saved',
        });
    });

    it('should handle errors when creating a user', async () => {
        user_model.prototype.save = jest.fn().mockRejectedValueOnce(new Error('Database error'));

        const newUser = {
            name: 'Agzam',
            code: '111',
        };

        const response = await request(app)
            .post('/')
            .send(newUser);

        expect(response.status).toBe(400);
        expect(response.body).toBe('Error Database error');
    });
});
