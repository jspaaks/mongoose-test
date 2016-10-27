//
// // in the terminal, start mongo shell by ``mongo``
// // use test database
// // use events collection
// var mapfun = function() {
//     if (this.hasOwnProperty("type")) {
//         var entity = {
//             "type": "entity",
//             "name": this.name,
//             "parent": this._id
//         }
//         emit(new ObjectId(), entity);
//     } else {
//         //
//     }
// };
//
// var reducefun = function(key, value) {
//     return value;
// };
//
// var outstr = {out: "map_reduce_example"};
//
// db.events.mapReduce(mapfun, reducefun, outstr);
//
// db.map_reduce_example.find({});
//
// //
// // // this next stuff is for troubleshooting the map function
// //
// // var rootDoc = db.events.findOne({});
// //
// // var emit = function(key, value) {
// //     print("emit");
// //     print("key: " + key + "  value: " + tojson(value));
// // }
// //
// // mapfun.apply(rootDoc)


function haschildren(doc) {
    return doc.hasOwnProperty("children") &&
        doc.children instanceof Array &&
        doc.children.length > 0;
}

function hasinstances(doc) {
    return doc.instance_count > 0;
}

function emit(key, value) {
    print("will emit ");
    print("key: " + key + "  value: " + tojson(value));
}


function drilldown(doc, path) {

    path = path.concat([{id:doc._id || ObjectId(), name:doc.name}]);

    var pathstr = "";
    path.forEach((p) => {
        pathstr += p.name.valueOf();
        pathstr += "/";
    });
    print("entity:   " + pathstr);

    if (haschildren(doc)) {
        doc.children.forEach((child) => {
            drilldown(child, path);
        });
    };
    if (hasinstances(doc)) {
        doc.instances.forEach((instance) => {
            print("instance: " + instance.name + " of entity " + path[path.length - 1].name);
            var value = {
                mention_count: instance.mention_count,
                name: instance.name,
                url: instance.url,
                pathstr: pathstr,
                path: path,
                instanceOf: path[path.length - 1].id.valueOf()
            };
            var key = ObjectId();
            emit(key, value);
        });
    }
}


var doc = db.events.findOne({});
path = [];

drilldown(doc, path);



