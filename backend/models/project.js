var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
        projectName:{
            type: String,
            default: ''
        },

        listMember: [{
            phone: String,
            memberName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member'
            }
        }]
    },
    {
        timestamps: true
});

module.exports =  mongoose.model('Project',projectSchema);;