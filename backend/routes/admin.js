const express = require('express');
const router = express.Router();
const {validateAdmin,AdminModel} = require('../models/admin');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

router.post('/',async (req,res) => {
    const valid = validateAdmin(req.body);
    if (valid.error) return res.status(400).send(valid.error.details[0].message);

    let admin = await AdminModel.findOne({email : req.body.email});
    if (admin) return res.status(400).send('User already exist');

    admin = new AdminModel(_.pick(req.body,['username','email','password']));
    
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password, salt);

    await admin.save();
    const token = jwt.sign({_id: admin._id},config.get('jwtPrivateKey'));
    res.header('x-auth-token',token).send(_.pick(admin,['name','email']));
})

module.exports = router;