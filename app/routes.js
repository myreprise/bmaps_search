// Dependencies
var mongoose        = require('mongoose');
var Location      = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all locations in the db
    app.get('/locations', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Location.find({});
        query.exec(function(err, locations){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all locations
            res.json(locations);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new locations in the db
    app.post('/locations', function(req, res){

        // Creates a new Location based on the Mongoose schema and the post body
        var newlocation = new Location(req.body);

        // New Location is saved in the db.
        newlocation.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new location
            res.json(req.body);
        });
    });

    // Retrieve JSON records for all locations that meet criteria
    app.post('/query', function(req, res){

        // Grab all query parameters from the body.
        //----------------------------------------------
        //NEED TO UPDATE AND HASH OUT THIS SEARCH FORM & PARAMETERS
        var residence = req.body.residence;
        var block = req.body.block;

        //Open a generic Mongoose Query
        var query = Location.find({});


        //Other queries will go here...
        if(residence){
            query.where('residence').equals(residence);
        }

        if(block){
            query.where('block').equals(block)
        }


        // Execute Query and Return the Query Results
        //If no errors, respond with a JSON of all locations that meet criteria
        query.exec(function(err, locations){
            if(err){
                res.send(err);
            } else {
                res.json(locations)                
            }
        });
    });
};