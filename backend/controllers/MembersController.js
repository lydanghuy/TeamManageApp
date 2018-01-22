var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var passport = require('passport');
var Member = require('../models/member');
var Project = require('../models/project');

/**     1)
         * api/members/signup:
         *   method: post
         *     tags:
         *       - Members Controllers
         *     description: Create new member
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: name
         *         type: String
         *         required: true
         *       - name: phone
         *         type: Number
         *         required: true, unique: true
         *         schema:
         *            memberSchema
         *     resultss:
         *       200:
         *         description: Successfully Create New Member
**/

router.post('/createMember', (req, res, next) => {
  Member.findOne({ phone: req.body.phone}).exec(function (err, result) {
    if(result){
      return res.json({success: false, err:"Phone exists"});
    }
    else{
      //create new member
      var member = new Member({name: req.body.name , phone: req.body.phone});
      member.save((err, member) => {
        if(err){
          res.statusCode = 500;
          res.setHeader('Content-Type','application/json');
          res.json({success: false, err : err});
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json({ success: true , message : 'Successfully Create New Member'});
      });
    }
  });
});

/**     2)
         * api/members/searchMember:
         *   method: post
         *     tags:
         *       - Members Controllers
         *     description: Search available members
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: projectCreator
         *         type: String
         *         required: true
         *         schema:
         *            memberSchema
         *     resultss:
         *       200:
         *         description: Show members to add
**/
router.route('/:searchMember').get(function(req,res){

  var searchResults=[];
  Member.find({},function(err,results){
    for (var i=0;i< results.length;i++){
        var memberName = results[i].username.toLowerCase();

      if (memberName.indexOf(req.params.searchMember.split("&").join(" ")) != -1){
        searchResults.push(results[i]);
      }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(searchResults);
  });
});

module.exports = router;