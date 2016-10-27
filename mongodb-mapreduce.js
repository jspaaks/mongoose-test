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


function drilldown(doc, path) {

    path = path.concat([doc.name]);
    var pathstr = "";
    path.forEach((id) => {
        pathstr += id.valueOf();
        pathstr += "/";
    });

    print(pathstr);
    //var newid = ObjectId();
    if (haschildren(doc)) {
//        drilldown(doc.children[0], path);
        doc.children.forEach((child) => {
            drilldown(child, path);
        });
    } else {
  //      print("No more child entities.");
//        print(Object.getOwnPropertyNames(doc));
    }
}


var doc = db.events.findOne({});
path = [];
//path.push(doc._id);

drilldown(doc, path);



