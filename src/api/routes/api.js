const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

router.use('/', (req, res) => {
    res.status(200).send('Server iss running!');
})

module.exports = router;