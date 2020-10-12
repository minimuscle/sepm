const express = require('express');
const request = require('request');
const fs = require('fs');
const router = express.Router();

const tours = require('../json/tours.json');
const types = require('../json/types.json');
const locations = require('../json/locations.json');
const users = require('../json/users.json');

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
    if(input.hasOwnProperty('name')){
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
}

function deleteData(data, input) {
	var index = data.findIndex(obj => obj.name == input.name);
    let spliced = data.splice(index, 1);
    console.log(spliced)
}

function updateLocation(data, input) {
    var index = data.findIndex(obj => obj.name == input.name);
    data[index].coordinates = input.coordinates
    data[index].description = input.description
    data[index].time = input.time
}

function updateTour(data, input) {
    var index = data.findIndex(obj => obj.name == input.name);
    data[index].type = input.type
    data[index].locations = input.locations
    data[index].time = input.time
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

router.get('/get/users', function(req, res, next) {
    res.json({
        data: users
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

router.post('/add/user', function(req, res, next) {
    isDuplicate = checkDuplicate(users, req.body.username)
    isValidUser = validateUser(req.body)
    
    if(!isDuplicate && isValidUser) {
        users.push(req.body)
        writeJson(users, "json/users.json")
        console.log("SUCCESS: User added.")
    } else if (!isValidUser) {
        console.log("ERROR: Invalid user.")
    } else if (isDuplicate){
        console.log("ERROR: Duplicate users.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/add/location', function(req, res, next) {
    isDuplicate = checkDuplicate(locations, req.body.name)
    isValidLocation = validateLocation(req.body)
    
    if(!isDuplicate && isValidLocation) {
        locations.push(req.body)
        writeJson(locations, "json/locations.json")
        console.log("SUCCESS: Location added.")
    } else if (!isValidLocation) {
        console.log("ERROR: Invalid location.")
    } else if (isDuplicate){
        console.log("ERROR: Duplicate locations.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/edit/location', function(req, res, next) {
    isDuplicate = checkDuplicate(locations, req.body.name)
    isValidLocation = validateLocation(req.body)

    if(isDuplicate && isValidLocation) {
        updateLocation(locations, req.body)
        writeJson(locations, "json/locations.json")
        console.log("SUCCESS: Location updated.")
    } else if(!isDuplicate) {
        console.log("ERROR: Location does not exist.")
    } else if(!isValidLocation) {
        console.log("ERROR: Invalid location.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/edit/tour', function(req, res, next) {
    isDuplicate = checkDuplicate(tours, req.body.name)
    isValidTour = validateTour(req.body)

    if(isDuplicate && isValidTour) {
        updateTour(tours, req.body)
        writeJson(tours, "json/tours.json")
        console.log("SUCCESS: Tour updated.")
    } else if(!isDuplicate) {
        console.log("ERROR: Tour does not exist.")
    } else if(!isValidTour) {
        console.log("ERROR: Invalid tour.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/edit/user', function(req, res, next) {
    isDuplicate = checkDuplicate(users, req.body.username)
    isValidUser = validateUser(req.body)

    if(isDuplicate && isValidUser) {
        updateUser(users, req.body)
        writeJson(users, "json/users.json")
        console.log("SUCCESS: User updated.")
    } else if(!isDuplicate) {
        console.log("ERROR: User does not exist.")
    } else if(!isValidUser) {
        console.log("ERROR: Invalid user.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/delete/location', function(req, res, next) {
	isDuplicate = checkDuplicate(locations, req.body.name)

	if(req.body.hasOwnProperty('name')) {
		if(isDuplicate) {
			deleteData(locations, req.body)
			console.log("SUCCESS: Location deleted.")
		} else {
			console.log("ERROR: Location does not exist.")
		}
	} else {
		console.log("ERROR: Invalid location.")
	}
});

router.post('/delete/tour', function(req, res, next) {
	isDuplicate = checkDuplicate(tours, req.body.name)

	if(req.body.hasOwnProperty('name')) {
		if(isDuplicate) {
			deleteData(tours, req.body)
			console.log("SUCCESS: Tour deleted.")
		} else {
			console.log("ERROR: Tour does not exist.")
		}
	} else {
		console.log("ERROR: Invalid tour.")
	}
});

router.post('/delete/types', function(req, res, next) {
	isDuplicate = checkDuplicate(types, req.body.name)

	if(req.body.hasOwnProperty('name')) {
		if(isDuplicate) {
			deleteData(types, req.body)
			console.log("SUCCESS: Tour Type " + req.body.name + " deleted.")
		} else {
			console.log("ERROR: Tour Type does not exist.")
		}
	} else {
		console.log("ERROR: Invalid Tour Type.")
	}
});

router.post('/delete/user', function(req, res, next) {
	isDuplicate = checkDuplicate(users, req.body.username)

	if(req.body.hasOwnProperty('username')) {
		if(isDuplicate) {
			deleteUser(users, req.body)
			console.log("SUCCESS: User deleted.")
		} else {
			console.log("ERROR: User does not exist.")
		}
	} else {
		console.log("ERROR: Invalid user.")
	}
});

router.post('/login', function(req, res, next) {
    isDuplicate = checkDuplicate(users, req.body.username)
    isValidLogin = validateLogin(req.body)

    if(isDuplicate && isValidLogin) {
        checkLogin = loginUser(users, req.body)
        if(checkLogin) {
            writeJson(users, "json/users.json")
            console.logStatus(202)
        } else {
            console.log("ERROR: Username or password is incorrect.")
        }
    } else if(!isDuplicate) {
        console.log("ERROR: User not found.")
    } else if(!isValidLogin) {
        console.log("ERROR: Invalid login.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

router.post('/logout', function(req, res, next) {
    isDuplicate = checkDuplicate(users, req.body.username)
    isValidLogout = validateLogout(req.body)

    if(isDuplicate && isValidLogout) {
        checkLogout = logoutUser(users, req.body)
        if(checkLogout) {
            writeJson(users, "json/users.json")
            console.log("SUCCESS: User logged out.")
        } else {
            console.log("ERROR: User is already logged out.")
        }
    } else if(!isDuplicate) {
        console.log("ERROR: User not found.")
    } else if(!isValidLogin) {
        console.log("ERROR: Invalid logout.")
    } else {
        console.log("ERROR: Unknown.")
    }
});

module.exports = router;