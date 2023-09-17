const express = require('express');
const router = express.Router();
const user_model = require('../models/user_model');

router.get('/',async (req, resp)=>{

    const users = await user_model.find()
        .then(users => resp.json({
            response: users,
            status: true,
            msj: 'get users true'
        }))
        .catch(err => resp.status(400).json('Error ' + err));
});

router.get('/:id',async (req, resp)=>{

    const user = await user_model.findById(req.params.id)
        .then(user => resp.json({
            response: user,
            status: true,
            msj: 'get user by id'
        }))
        .catch(err => resp.status(400).json('Error ' + err))
});

router.post('/', async (req, resp) => {
    const { name, last_name, username, email, password } = req.body;

    const obj = new user_model({name, last_name, username, email, password});

    await obj.save()
        .then(() => resp.json({
        status: true,
        msj: 'Value Saved'
    }))
        .catch(err => resp.status(400).json('Error ' + err))
});

router.put('/:id', async (req, resp) => {
    const { name, last_name, username, email} = req.body;
    const newName = { name, last_name, username, email };

    await user_model.findByIdAndUpdate(req.params.id, newName)
        .then(()=> resp.json({
            status: true,
            msj : 'Active'
        }))
        .catch(err => resp.status(400).json('Error ' + err));
});

router.delete('/:id', async (req, resp) => {
    await nombre.findByIdAndRemove(req.params.id)
        .then(resp.json({
            status : true,
            msj : 'Deleted'
        }))
        .catch(err => resp.status(400).json('Erros ' + err));
});

module.exports = router;