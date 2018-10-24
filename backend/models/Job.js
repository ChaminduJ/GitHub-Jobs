var mongoose = require("mongoose");

var JobSchema = new mongoose.Schema({
    created_at: { type: Date, default: Date.now },
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    how_to_apply: { type: String, required: true },
    company: { type: String, required: true },
    company_url: { type: String, required: true },
    company_logo: { type: String, required: true },
    url: {type:String, required:true}
});

module.exports = mongoose.model("Job", JobSchema);