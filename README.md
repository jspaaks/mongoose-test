# mongoose-test
trying out express, mongdb, and mongoose


- install MongoDB, for example follow [these](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/) instructions.
- install Nodejs, for example follow [these](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04#how-to-install-using-a-ppa) instructions.
- go to a terminal, verify that ``mongo`` command brings up the mongo command prompt.
- go to a terminal, run ``npm install`` to install the dependencies (at the time of writing, just mongoose and express)
- in a new terminal, go to the directory (may not be necessary, I don't know for sure), type ``node``, you should now be in the nodejs environment. Ctrl-C to get out of the environment.
- Now run ``node inject-some-data.js`` in order to
    - connect to a database called 'test'
    - create a couple of instances of ``Instance``
    - save a few of these to the database
    - then do some simple operations on the database, such as
        - a conditional ``count``
        - a conditional ``find``
    - then the script tries a second way of loading data, namely loading a bunch of instances at the same time, through the ``Instance.collection.insertMany`` method.
- so now we have some data in the database.
- start the server on port 3000 by running ``node index.js`` or by using the ``npm scripts`` command ``npm run start``
- in the browser, go to ``http://localhost:3000`` to check if it all works. If it does work, you should see a 'Hello World' message.
- in the browser, go to one of the routes that are defined in server.js, such as ``http://localhost:3000/id/13/children``, the server should respond with a text like 'getting children of node with id: 2...'


