var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var passportLocalMongoose = require('passport-local-mongoose');

// var listProjectSchema = new Schema({
//     projectName:{
//         type: mongoose.Schema.Types.String, 
//         ref : 'Project'
//     }
// },
//     {
//         timestamps: true
// });

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

//memberSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Member',memberSchema);