var mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
    admin_name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model("Admin", AdminSchema);