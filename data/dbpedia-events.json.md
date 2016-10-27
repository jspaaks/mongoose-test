


**todo**

- [x] use database test
- [x] use collection dbptypes
- [x] make collection instances
    db.model makes a collection but its instances need to be saved in order to show up
- [ ] retrieve a copy of the array stored in key "instances"
- [x] make Instance instances of each member of that array
    ``var Instance = require('./models/instance');``
    ``var inst0 = new Instance(theobject);``
- [x] submit them to the instances collection
    ``inst0.save();``
- [ ] replace the corresponding member in the array with a reference to the instances collection



general data structure

```
Event (e) {
    children: [
        SocietalEvent (e) {
            children: [
                MilitaryConflict (e) {
                    children: [],
                    instances: [
                        World_War_II (i)
                        Vietnam_War (i)
                    ]}
                SportsEvent (e) {
                    children: [],
                    instances: [
                        The_Open_Championship (i)
                    ]}
            ],
            instances: [
                War_of_the_Regulation
            ]
        }
    ],
    instances: []
}
```

in bash, I did

```bash
mongoimport --db test --collection events --type json --drop --file data/dbpedia-events.json
```
then in mongodb shell ``show collections`` returns
```
dbptypes
events
```
then, in node,
```javascript
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

conn.on('error', function() {
    console.error.bind(console, "connection error:");
});

conn.once('open', function() {
    console.log("Connected");
});


conn.db.collection('events').find()

```

