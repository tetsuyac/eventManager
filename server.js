"use strict";
var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose');
var app = module.exports = express();
// Configuration
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.configure('development', function () {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});
app.configure('production', function () {
  app.use(express.errorHandler());
});
// Model
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Event = new Schema({
  title:   String,
  content: String,
  date:    Date
});
Event.pre('save', function (next) {
  this.date = new Date();
  next();
});
mongoose.model('event', Event);
var db = mongoose.createConnection('mongodb://localhost/event');
var Event = db.model('event');
app.configure(function () {
  app.set('db', db);
});
// Routes
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.get('/event', function (req, res, next) {
  console.log("get eventlist");
  Event.find({}, function (err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});
app.get('/event/:id', function (req, res, next) {
  console.log("get event : " + req.params.id);
  Event.findById(req.params.id, function (err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});
app.post('/event', function (req, res, next) {
  console.log("post event : " + req.body.content);
  var event = new Event();
  event.title = req.body.title;
  event.content = req.body.content;
  event.save(function (err) {
    if (err) {
      return next(err);
    }
    res.json(event);
  });
});
app.put('/event/:id', function (req, res, next) {
  console.log("put event : " + req.params.id);
  console.log(req.body.content);
  Event.findById(req.params.id, function (err, data) {
    if (err) {
      return next(err);
    }
    data.title = req.body.title;
    data.content = req.body.content;
    data.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json(data);
    });
  });
});
app.del('/event/:id', function (req, res, next) {
  console.log("delete event : " + req.params.id);
  Event.findById(req.params.id, function (err, data) {
    if (err) {
      return next(err);
    }
    data.remove(function (err) {
      console.log("event remove!");
      res.json(data);
    });
  });
});
http.createServer(app).listen(3000, function () {
  console.log("Express server listening on port %d in %s mode", app.settings.port, app.settings.env);
});
