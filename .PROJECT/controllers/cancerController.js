
const mongoose = require('mongoose');
// const cancer = mongoose.model('cancer');
const cancer = require("../models/cancer.model");
const express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render("cancer/addOrEdit.hbs", {
        viewTitle: "Insert cancer"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});

function insertRecord(req, res) {

    const cancerData = new cancer({
        AGE: req.body.AGE,
        GENDER : req.body.GENDER,    
        ALCOHOLCONSUMING : req.body.ALCOHOLCONSUMING,
        CHRONICDISEASE : req.body.CHRONICDISEASE,
    });

    
    cancerData.save((err, doc) => {
        if (!err)
            res.render('cancer/list.hbs',{
                list: cancerData
            });
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cancer/addOrEdit", {
                    viewTitle: "Insert Employee",
                    cancer: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });

}


function updateRecord(req, res) {
    cancer.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('cancer/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("cancer/addOrEdit", {
                    viewTitle: 'Update Cancer',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    cancer.find((err, docs) => {
        if (!err) {
            res.render("cancer/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});


router.get('/:id', (req, res) => {
    cancer.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("cancer/addOrEdit", {
                viewTitle: "Update cancer",
                employee: doc
            });
        }
    });
});

router.post('/delete/:id', (req, res) => {
    console.log("delete hit")
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/cancer/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});


module.exports = router;