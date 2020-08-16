const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

const tours = require('../json/tours.json');
const types = require('../json/types.json');
const locations = require('../json/locations.json');

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

function validateLocation(input) {
    if(input.hasOwnProperty('name') && input.hasOwnProperty('coordinates') && input.hasOwnProperty('description') && input.hasOwnProperty('time')){
        return true
    } else {
        return false
    }
}

function validateTour(input) {
    if(input.hasOwnProperty('name') && input.hasOwnProperty('type') && input.hasOwnProperty('locations') && input.hasOwnProperty('time')){
        return true
    } else {
        return false
    }
}

function updateTypes(data, input) {
    var index = data.findIndex(obj => obj.name == input.name);
    data[index].name = input.name
    data[index].tours = input.tours
}

//Test Command
router.get('/', (req, res) => {
	console.log("GET recieved")
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

router.get('/get/locations', function(req, res, next) {
    res.json({
        data: locations
    })
});


//Post Data
router.post('/add/types', function(req, res, next) {
    isDuplicate = checkDuplicate(types, req.body.name)
    isValidType = validateTypes(req.body)
    
    if(!isDuplicate && isValidType) {
        types.push(req.body)
        writeJson(types, "json/types.json")
        console.log("SUCCESS: Tour Type added.")
    } else if (!isValidType) {
        console.log("ERROR: Invalid Tour Type.")
    } else if (isDuplicate){
        console.log("ERROR: Duplicate Tour Types.")
        console.log("DUPLICATE TOUR TYPE")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/add/tour', function(req, res, next) {
    isDuplicate = checkDuplicate(tours, req.body.name)
    isValidTour = validateTour(req.body)
    
    if(!isDuplicate && isValidTour) {
        tours.push(req.body)
        writeJson(tours, "json/tours.json")
        console.log("SUCCESS: Tour added.")
    } else if (!isValidTour) {
        console.log("ERROR: Invalid tour.")
    } else if (isDuplicate){
        console.log("ERROR: Duplicate tours.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/edit/types', function(req, res, next) {
    isDuplicate = checkDuplicate(types, req.body.name)
    isValidType = validateTypes(req.body)

    if(isDuplicate && isValidType) {
        updateTypes(types, req.body)
        writeJson(types, "json/types.json")
        console.log("SUCCESS: Tour updated.")
    } else if(!isDuplicate) {
        console.log("ERROR: Tour does not exist.")
    } else if(!isValidType) {
        console.log("ERROR: Invalid tour.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

module.exports = router;