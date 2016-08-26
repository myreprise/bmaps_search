// Dependencies
var mongoose        = require('mongoose');
var Respondent      = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all respondents in the db
    app.get('/respondents', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Respondent.find({});
        query.exec(function(err, respondents){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all respondents
            res.json(respondents);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new respondents in the db
    app.post('/respondents', function(req, res){

        // Creates a new Respondent based on the Mongoose schema and the post body
        var newrespondent = new Respondent(req.body);

        // New Respondent is saved in the db.
        newrespondent.save(function(err){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of the new respondent
            res.json(req.body);
        });
    });

    // Retrieve JSON records for all respondents that meet criteria
    app.post('/query', function(req, res){

        // Grab all query parameters from the body.
        //----------------------------------------------
        //NEED TO UPDATE AND HASH OUT THIS SEARCH FORM & PARAMETERS
        var gender = req.body.gender;

        //Open a generic Mongoose Query
        var query = Respondent.find({});


        //Other queries will go here...
        if(gender){
            query.where('gender').equals(gender);
        }


        // Execute Query and Return the Query Results
        //If no errors, respond with a JSON of all respondents that meet criteria
        query.exec(function(err, respondents){
            if(err){
                res.send(err);
            } else {
                res.json(respondents)                
            }
        });
    });
};