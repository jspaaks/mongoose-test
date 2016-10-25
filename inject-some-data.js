
// part of the data is structured as follows
//
// Instance: {
//     mention_count: Number,
//     name: String,
//     url: String
// };
//
// this structure is reflected in the data model defined in models/instance.js

var mongoose = require('mongoose');
var assert = require('assert');
var Instance = require('./models/instance');


// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, "connection error:"));

// make a couple of instances of Instance

var inst0 = new Instance({
    mention_count: 46,
    name: "Televizija_OBN",
    url: "http://dbpedia.org/resource/Televizija_OBN"
});

var inst1 = new Instance({
    mention_count: 24,
    name: "CBS",
    url: "http://dbpedia.org/resource/CBS"
});

var inst2 = new Instance({
    mention_count: 10,
    name: "Doordarshan",
    url: "http://dbpedia.org/resource/Doordarshan"
});

var inst3 = new Instance({
    mention_count: 2,
    name: "Munhwa_Broadcasting_Corporation",
    url: "http://dbpedia.org/resource/Munhwa_Broadcasting_Corporation"
});

var inst4 = new Instance({
    mention_count: 1,
    name: "Bulgarian_National_Television",
    url: "http://dbpedia.org/resource/Bulgarian_National_Television"
});

var inst5 = new Instance({
    mention_count: 1,
    name: "Romanian_Television",
    url: "http://dbpedia.org/resource/Romanian_Television"
});


// save the instance inst4 of Instance to the database
inst4.save(function (err, inst4) {
    if (err) {
        console.error(err);
    }
});

// save the instance inst5 of Instance to the database
inst5.save(function (err, inst5) {
    if (err) {
        console.error(err);
    }
});

// count all instances of Instance whose 'name' is "Romanian_Television"
Instance.count({
        name: "Romanian_Television"
    }, function(err, count) {
    if (err) {
        console.log(err);
    } else {
        console.log("count =", count);
    }
});

// find all instances of Instance whose 'name' is "Romanian_Television"
Instance.find({
        name: "Romanian_Television"
    }, function(err, found) {
    if (err) {
        console.log(err);
    } else {
        console.log("found =", found);
    }
});

// find all instances of Instance whose 'name' starts with any character
Instance.find({
        name: new RegExp("^.")
    }, function(err, found) {
    if (err) {
        console.log(err);
    } else {
        console.log("found =", found);
    }
});


// now a different way of loading data.
var data = [{
    "mention_count": 53,
    "name": "Pakistan_International_Airlines",
    "url": "http://dbpedia.org/resource/Pakistan_International_Airlines"
}, {
    "mention_count": 36,
    "name": "Lufthansa",
    "url": "http://dbpedia.org/resource/Lufthansa"
}, {
    "mention_count": 21,
    "name": "Austrian_Airlines",
    "url": "http://dbpedia.org/resource/Austrian_Airlines"
}, {
    "mention_count": 15,
    "name": "British_Airways",
    "url": "http://dbpedia.org/resource/British_Airways"
}, {
    "mention_count": 14,
    "name": "Delta_Air_Lines",
    "url": "http://dbpedia.org/resource/Delta_Air_Lines"
}, {
    "mention_count": 12,
    "name": "Albanian_Airlines",
    "url": "http://dbpedia.org/resource/Albanian_Airlines"
}, {
    "mention_count": 10,
    "name": "Swiss_International_Air_Lines",
    "url": "http://dbpedia.org/resource/Swiss_International_Air_Lines"
}, {
    "mention_count": 6,
    "name": "Alitalia",
    "url": "http://dbpedia.org/resource/Alitalia"
}, {
    "mention_count": 4,
    "name": "Scandinavian_Airlines",
    "url": "http://dbpedia.org/resource/Scandinavian_Airlines"
}, {
    "mention_count": 4,
    "name": "Shaheen_Air",
    "url": "http://dbpedia.org/resource/Shaheen_Air"
}, {
    "mention_count": 3,
    "name": "US_Airways",
    "url": "http://dbpedia.org/resource/US_Airways"
}, {
    "mention_count": 2,
    "name": "Adria_Airways",
    "url": "http://dbpedia.org/resource/Adria_Airways"
}, {
    "mention_count": 2,
    "name": "Air_Canada",
    "url": "http://dbpedia.org/resource/Air_Canada"
}, {
    "mention_count": 2,
    "name": "Belle_Air",
    "url": "http://dbpedia.org/resource/Belle_Air"
}, {
    "mention_count": 2,
    "name": "Genex",
    "url": "http://dbpedia.org/resource/Genex"
}, {
    "mention_count": 2,
    "name": "Gulf_Air",
    "url": "http://dbpedia.org/resource/Gulf_Air"
}, {
    "mention_count": 2,
    "name": "Jet_Airways",
    "url": "http://dbpedia.org/resource/Jet_Airways"
}, {
    "mention_count": 2,
    "name": "Singapore_Airlines",
    "url": "http://dbpedia.org/resource/Singapore_Airlines"
}, {
    "mention_count": 2,
    "name": "United_Airlines",
    "url": "http://dbpedia.org/resource/United_Airlines"
}, {
    "mention_count": 1,
    "name": "Aegean_Airlines",
    "url": "http://dbpedia.org/resource/Aegean_Airlines"
}, {
    "mention_count": 1,
    "name": "Aero_Asia_International",
    "url": "http://dbpedia.org/resource/Aero_Asia_International"
}, {
    "mention_count": 1,
    "name": "Air_France",
    "url": "http://dbpedia.org/resource/Air_France"
}, {
    "mention_count": 1,
    "name": "Qantas",
    "url": "http://dbpedia.org/resource/Qantas"
}, {
    "mention_count": 1,
    "name": "South_African_Airways",
    "url": "http://dbpedia.org/resource/South_African_Airways"
}, {
    "mention_count": 1,
    "name": "Swift_Air",
    "url": "http://dbpedia.org/resource/Swift_Air"
}, {
    "mention_count": 1,
    "name": "Turkish_Airlines",
    "url": "http://dbpedia.org/resource/Turkish_Airlines"
}];


Instance.collection.insertMany(data, function(err, r) {
    assert.equal(null, err);
    assert.equal(26, r.insertedCount);
});




