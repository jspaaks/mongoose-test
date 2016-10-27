var express = require('express');
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


mongoose.connection.on('error', function() {
    console.error.bind(console, "connection error:");
});

mongoose.connection.once('open', function() {
    console.log("Connected");
});

var errhandler = (err) => {
    console.error("Something went wrong ", err);
};

var cb = (resolved) => {
    console.log(resolved);
    return resolved;
};

var nodes = mongoose.connection.db.collection('nodes');



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

app.get('/test', function (req, res, next) {
    nodes.findOne({}, function(err, found) {
        if (err) {
            res.send(err);
        } else {
            console.log(found);
            res.json(found);
        }
    });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
