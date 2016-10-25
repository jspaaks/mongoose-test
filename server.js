var express = require('express');
var mongoose = require('mongoose');
var Instance = require('./models/instance');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));




var app = express();

app.param(['id'], function(req, res, next, num, name){
    req.params[name] = parseInt(num, 10);
    if( isNaN(req.params[name]) ) {
        next(createError(400, 'failed to parseInt ' + num));
    } else {
        next();
    }
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/some/other/route', function (req, res) {
    res.send('Some other route');
});

app.get('/id/:id/children', function (req, res) {
    var str = 'getting children of node with id: ' + req.params.id + '...';
    res.send(str);
});

app.get('/id/:id/parent', function (req, res) {
    var str = 'getting parent of node with id: ' + req.params.id + '...';
    res.send(str);
});

app.get('/id/:id/instances', function (req, res) {
    var str = 'getting instances of node with id: ' + req.params.id + '...';
    res.send(str);
});

app.get('/id/:id', function (req, res, next) {
    Instance.find({
            name: new RegExp("^.")
        }, function(err, found) {
        if (err) {
            res.send(err);
        } else {
            res.json(found);
        }
    });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
