var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Member = require('../models/member');
var Project = require('../models/project');

/**     1)
         * api/projects/:
         *   method: get
         *     tags:
         *       - Projects Controllers
         *     description: Show all projects' detail
         *     produces:
         *       - application/json
         *         schema:
         *            projectSchema
         *     responses:
         *       200:
         *         description: Project list
**/

router.route('/')
.get((req, res, next) =>{
    Project.find({})
    .populate('listMember.memberName')
    .then((projects) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(projects);
    }, (err) => next(err))
    .catch((err) => next(err));
})

/**     2)
         * api/projects/:
         *   method: post
         *     tags:
         *       - Projects Controllers
         *     description: Create project
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: projectCreator
         *         type: String
         *         required: true
         *         schema:
         *            projectSchema
         *     responses:
         *       200:
         *         description: Successfully created prroject
**/

.post((req ,res, next) => {
    Project.create(req.body)
    .then((project) =>{
    project.save();
    console.log('Project Created ', project);
    
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({success: true, project});
}, (err) => next(err))
.catch((err) => next(err));
});

/**     3)
         * api/projects/projectId:
         *   method: get
         *     tags:
         *       - Projects Controllers
         *     description: Show project detail
         *     produces:
         *       - application/json
         *         schema:
         *            projectSchema
         *     responses:
         *       200:
         *         description: Project detail
**/

router.route('/:projectId')
.get((req, res, next) => {
    Project.findById(req.params.projectId)
    .populate('listMember.memberName')
    .then((project) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(project);
    }, (err) => next(err))
    .catch((err) => next(err));
});

/**     4)
         * api/projects/projectId/assign:
         *   method: post
         *     tags:
         *       - Projects Controllers
         *     description: Assign member to project
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: projectCreator
         *         type: String
         *         required: true
         *       - name: member
         *         type: String
         *         required: true
         *         schema:
         *            projectSchema
         *     responses:
         *       200:
         *         description: Successfully assign member to project
**/

router.route('/:projectId/assign').post((req,res,next) => {
    Project.findById(req.params.projectId)
    .then((project) => {
        if(project!=null ){
            Member.findOne({ phone: req.body.phone}).exec((err, phoneNumber) => {
                if(phoneNumber){
                    for(var i = 0 ; i < project.listMember.length ; i++) {
                        if(project.listMember[i].phone == req.body.phone){
                            res.statusCode = 409;
                            res.setHeader('Content-Type','application/json');
                            return res.json({success: false, err : "Member exists"});
                        }
                    }
                    req.body.memberName = phoneNumber._id;
                    project.listMember.push(req.body);
                    project.save()
                    .then((project) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json({success : true, project});
                    }, (err) => next(err));
                }
                else{
                    res.statusCode = 404;
                    res.setHeader('Content-Type','application/json');
                    res.json({success: false, err : "Member not found"});
                    return next(err);
                }
            }); //Member.findOne
        }
        else{
            err = new Error('Project ' + req.params.projectId + ' not found.');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;