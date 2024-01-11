'use strict';
require('dotenv').config({ path: '.env' });
const express = require("express");

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).json("Hello, welcome Students");
});

router.post('/create', async (req, res) => {
    res.status(200).json("Hello, welcome Students");
});

module.exports = router;
