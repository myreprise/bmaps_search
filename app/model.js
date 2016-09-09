// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Create a Project Schema. This is the basis for most important data model in the app
var LocationSchema = new Schema({
   block: {type: String},
   latitude: {type: Number},
   longitude: {type: Number},
   residence: {type: String},
   distance: {type: Number}
});

// Index the schema in 2dsphere format (for proximity searches)
//ProjectSchema.index({location: '2dsphere'});

// Export the ProjectSchema for use elsewhere. Sets the MongoDB collection as "db-projects"
module.exports = mongoose.model('locations', LocationSchema);