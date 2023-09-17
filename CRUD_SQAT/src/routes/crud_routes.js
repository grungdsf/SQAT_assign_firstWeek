const express = require('express');
const router = express.Router();
const nombre = require('../models/crud_model');

router.get('/',async (req, resp)=>{

    const name = await nombre.find();

    resp.json({
        response: name,
        status: true,
        msj: 'data'
    });
});

router.get('/:id',async (req, resp)=>{

    const name = await nombre.findById(req.params.id);

    resp.json({
        response: name,
        status: true,
        msj: 'data by id'
    });
});

router.post('/', async (req, resp) => {
    const { name, apellido } = req.body;

    const obj = new nombre({name,apellido});
    await obj.save();
    resp.json({
        msj: 'Saved Value',
        status: true
    });
});

router.put('/:id', async (req, resp) => {
    const { name, apellido } = req.body;
    const newName = { name, apellido };

    await nombre.findByIdAndUpdate(req.params.id, newName);

    resp.json({
        msj: 'Updated',
        status: true
    });

});

router.delete('/:id', async (req, resp) => {
    await nombre.findByIdAndRemove(req.params.id);

    resp.json({
        msj: 'Deleted',
        status: true
    });
});

module.exports = router;