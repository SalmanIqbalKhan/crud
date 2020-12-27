const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("course/addOrEdit", {
        viewTitle: "Insert Course"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var course = new Course();
    course.Course_Name = req.body.Course_Name;
    course.Course_id = req.body.Course_id;
    course.Course_Duration = req.body.Course_Duration;
    course.Course_Fee = req.body.Course_Fee;
    course.save((err, doc) => {
        if (!err)
            res.redirect('course/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: "Insert Course",
                    course: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit", {
                    viewTitle: 'Update Course',
                    course: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            const context = {
                list: docs.map(doc => {
                    return {
                        _id: doc._id,
                        Course_Name: doc.Course_Name,
                        Course_id : doc.Course_id,
                        Course_Duration : doc.Course_Duration,
                        Course_Fee : doc.Course_Fee
                    }
                })
            }

            res.render('course/list', {
                list: context.list
            })
            
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Course_Name':
                body['Course_NameError'] = err.errors[field].message;
                break;
            case 'Course_id':
                body['Course_idError'] = err.errors[field].message;
                break;
                case 'Course_Duration':
                body['Course_DurationError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("course/addOrEdit", {
                viewTitle: "Update Course",
                course: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/course/list');
        }
        else { console.log('Error in course delete :' + err); }
    });
});

module.exports = router;