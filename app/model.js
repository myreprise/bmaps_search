// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Create a Project Schema. This is the basis for most important data model in the app
var RespondentSchema = new Schema({
    age_group: {type: String},
    companion_count: {type: String},
    companion_type: {type: [String]},
    competitor_visits: {type: [String]},
    education: {type: String},
    exp_ind_children: {type: Number},
    exp_ind_fb: {type: Number},
    exp_ind_leisure: {type: Number},
    exp_ind_clothes: {type: Number},
    exp_ind_total: {type: Number},
    exp_grp_children: {type: Number},
    exp_grp_fb: {type: Number},
    exp_grp_leisure: {type: Number},
    exp_grp_clothes: {type: Number},
    exp_grp_total: {type: Number},
    gender: {type: String},
    income: {type: String},
    location: {type: [Number], required: true}, // [Long, Lat]
    member_type: {type: String},
    ref_id: {type: Number},
    residence: {type: String},
    transport_method: {type: [String]},
    visit_duration: {type: String},
    visit_frequency: {type: String},
    weekend: {type: Boolean}
});

// Index the schema in 2dsphere format (for proximity searches)
//ProjectSchema.index({location: '2dsphere'});

// Export the ProjectSchema for use elsewhere. Sets the MongoDB collection as "db-projects"
module.exports = mongoose.model('respondents', RespondentSchema);