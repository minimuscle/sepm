const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

const tours = require('../json/tours.json');
const types = require('../json/types.json');

function checkDuplicate(data, input) {
    var matches = 0
    Object.keys(data).forEach(function(key) {
      if(input == data[key].name || input == data[key].username){
        matches++ 
      }
    })
    return matches
}

function writeJson(data, file) {
    var json = JSON.stringify(data)
    fs.writeFile(file, json, 'utf8', function(err) {
        if (err) throw err
    });
}

function validateTypes(input) {
    if(input.hasOwnProperty('name') && input.hasOwnProperty('tours')){
        return true
    } else {
        return false
    }
}

//Test Command
router.get('/', (req, res) => {
	console.log("GET recieved")
	res.send("GET recieved")
});


//Get Data
router.use('/get/tours', (req, res) => {
    res.json({
        data: tours
    })
});

router.use('/get/types', (req, res) => {
    res.json({
        data: types
    })
});






//Post Data
router.post('/add/types', function(req, res, next) {
    isDuplicate = checkDuplicate(types, req.body.name)
    isValidType = validateTypes(req.body)
    
    if(!isDuplicate && isValidLocation) {
        types.push(req.body)
        writeJson(types, "jsons/types.json")
        res.send("SUCCESS: Tour Type added.")
    } else if (!isValidLocation) {
        res.send("ERROR: Invalid Tour Type.")
    } else if (isDuplicate){
        res.send("ERROR: Duplicate Tour Types.")
    } else {
        res.send("ERROR: Unknown.")
    }
});
module.exports = router;