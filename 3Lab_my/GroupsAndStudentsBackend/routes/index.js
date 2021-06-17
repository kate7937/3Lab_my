var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema({firstName: String, lastName: String, secondName: String, groupId: String}, {versionKey: false});
const User = mongoose.model("User", userScheme);

const groupScheme = new Schema({name: String}, {versionKey: false});
const Group = mongoose.model("Group", groupScheme);

router.get('/group', function(req, res) {
  Group.find(function (err, doc) {
    res.send(doc)
  });
});

router.post('/group', function(req, res) {
  Group.create( {name: req.query.name}, function (err, doc) {
    res.send(doc)
  });
});

router.delete('/group', function(req, res) {
  Group.deleteOne({_id: req.query._id}, function (err, doc) {
    if (err) {
      res.send(false);
    } else {
      res.send(doc.deletedCount === 1)
    }
  });
});

router.get('/user', function(req, res) {
  User.find({groupId: req.query.groupId},function (err, doc) {
    res.send(doc)
  });
});

router.post('/user', function(req, res) {
  User.create( {firstName: req.query.firstName, lastName: req.query.lastName, secondName: req.query.secondName, groupId: req.query.groupId}, function (err, doc) {
    res.send(doc)
  });
});

router.delete('/user', function(req, res) {
  User.deleteOne({_id: req.query._id}, function (err, doc) {
    if (err) {
      res.send(false);
    } else {
      res.send(doc.deletedCount === 1)
    }
  });
});

module.exports = router;
