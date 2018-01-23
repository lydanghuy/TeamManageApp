var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberSchema = new Schema({
    name:{
        type : String,
        default:''
    },
    phone:{
        type: String,
        default:''
    }
});

module.exports = mongoose.model('Member',memberSchema);