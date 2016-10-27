//
// // in the terminal, start mongo shell by ``mongo``
// // use test database
// // use events collection
//

function mapfun() {

    function haschildren(doc) {
        return doc.hasOwnProperty("children") &&
            doc.children instanceof Array &&
            doc.children.length > 0;
    }

    function hasinstances(doc) {
        return doc.instance_count > 0;
    }

    // function emit(key, value) {
    //     print("would emit ");
    //     print("key: " + key + "  value: " + tojson(value));
    // }

    function pathtostr(path) {
        var pathstr = "";
        path.forEach((p) => {
            pathstr += p.name;
            pathstr += "/";
        });
        return pathstr;
    }

    function drilldown(doc, path) {

        if (typeof path === "undefined" || (path instanceof Array && path.length === 0)) {
            path = [{
                id: ObjectId(),
                name: ""
            }];
        }

        var value = {
            childOf: path[path.length - 1].id.valueOf(),
            instance_count: doc.instance_count,
            isentity: true,
            isinstance: false,
            mention_count: doc.mention_count,
            name: doc.name,
            path: path,
            pathstr: pathtostr(path),
            type: doc.type,
            url: doc.url
        };
        var key = ObjectId();
        emit(key, value);

        path = path.concat([{id:doc._id || ObjectId(), name:doc.name}]);

        if (haschildren(doc)) {
            doc.children.forEach((child) => {
                drilldown(child, path);
            });
        };
        if (hasinstances(doc)) {
            doc.instances.forEach((instance) => {
                print("instance: " + instance.name + " of entity " + path[path.length - 1].name);
                var value = {
                    instanceOf: path[path.length - 1].id.valueOf(),
                    isentity: false,
                    isinstance: true,
                    mention_count: instance.mention_count,
                    name: instance.name,
                    path: path,
                    pathstr: pathtostr(path),
                    url: instance.url
                };
                var key = ObjectId();
                emit(key, value);
            });
        }
    }

    var doc = this;
    drilldown(doc);
};

function reducefun(key, value) {
    return value;
};

var outstr = {out: "nodes"};

db.events.mapReduce(mapfun, reducefun, outstr);




