var mongoose = require("mongoose");


var <%= modelName %>Schema = new mongoose.Schema({


});

module.exports = mongoose.model("<%= modelName %>", <%= modelName %>Schema);
