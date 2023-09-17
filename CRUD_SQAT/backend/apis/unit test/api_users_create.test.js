const request = require('supertest');
const express = require('express');
const app = express();
const user_model = require('../models/user_model');

const router = express.Router();

router.get('/', async (req, resp) => {
    try {
        const users = await user_model.find();
        resp.json({
            response: users,
            status: true,
            msj: 'get users true',
        });
    } catch (err) {
        resp.status(400).json('Error ' + err);
    }
});

router.get('/:id', async (req, resp) => {
    try {
        const user = await user_model.findById(req.params.id);
        resp.json({
            response: user,
            status: true,
            msj: 'get user by id',
        });
    } catch (err) {
        resp.status(400).json('Error ' + err);
    }
});

app.use('/', router);

describe('User Routes', () => {
    it('should list all users', async () => {
        user_model.find = jest.fn().mockResolvedValueOnce([
            { name: 'Agzam', email: '111' },
            { name: 'Admin', email: '222' },
        ]);

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            response: [
                { name: 'Agzam', email: '111' },
                { name: 'Admin', email: '222' },
            ],
            status: true,
            msj: 'get users true',
        });
    });

    it('should get a user by ID', async () => {
        user_model.findById = jest.fn().mockResolvedValueOnce({
            name: 'User1',
            email: 'user1@example.com',
        });

        const userId = '6506c48c8772c34cb4cd2cae';

        const response = await request(app).get(`/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            response: {
                name: 'Agzam',
                email: '111',
            },
            status: true,
            msj: 'get user by id',
        });
    });

    it('should handle errors when listing users', async () => {
        user_model.find = jest.fn().mockRejectedValueOnce(new Error('Database error'));

        const response = await request(app).get('/');

        expect(response.status).toBe(400);
        expect(response.body).toBe('Error Database error');
    });

    it('should handle errors when getting a user by ID', async () => {
        user_model.findById = jest.fn().mockRejectedValueOnce(new Error('User not found'));

        const userId = '6506c48c8772c34cb4cd2cae';

        const response = await request(app).get(`/${userId}`);

        expect(response.status).toBe(400);
        expect(response.body).toBe('Error User not found');
    });
});
