const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

const tours = require('../json/tours.json');

router.get('/', (req, res) => {
	console.log("GET recieved")
	res.send("GET recieved")
});

router.use('/get/tours', (req, res) => {
    res.json({
        data: tours
    })
});

module.exports = router;