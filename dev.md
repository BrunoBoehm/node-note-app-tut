## S3L9 . Modules in node
Units of functionality

`require` lets you load in modules (in node (like http) or third party (like express) and our files).

Built in modules are available at https://nodejs.org/api/

We will use the OS and File System.

We use `fr.appendFile`, that requires a callback.
```js
// file system is built in
const fs = require('fs');

fs.appendFile('greetings.txt', 'Hello world', function (err) {
    if (err) {
        console.log(err);
    }
});
```
It creates a txt file for us if doesn't exist.

We us OS to get user info like user name, to say "Hello name"
```js
// file system is built in
const fs = require('fs');
const os = require('os');

var user = os.userInfo();
// console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}`, function (err) {
    if (err) {
        console.log(err);
    }
});
```

## S3.L10 Exports and requiring our own files
We can require the new "notes.js" file from our main "app.js" file.
It doesn't export anything (functions or values) but that's fine!

Inside of notes.js if we `module.exports.age = 25;` (module is a global object available to all of our files once we require the file, we can get the age like so `console.log(notes.age);`

## S3.L11 Using NPM modules
Packages are regular node code and solve most of your functional problems without reinventing the wheel.
jQuery and React also live on npm.

`npm -v` to get your version.
Type `npm init` to get started. It will create the `package.json`.

We install lodash that contains utilities that make dev easier. https://www.npmjs.com/package/lodash
Install it with `npm install lodash --save`. the `--save` flag will update the `package.json` in `dependencies`.
```json
{
  "name": "note-app",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Bruno B",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4.17.10"
  }
}
```

We can now require it.
```js
const _ = require('lodash');

console.log( _.isString("Bruno") );

var filteredArray = _.uniq([1, 1, 3, 4, 5, 5])
console.log(filteredArray);
```

The node modules is not to be put in source controle. Inside of the `.gitignore` you can write `node_modules`.
If you erase it or start and existing node project, you can install all necessary modules with `npm install`.

## S3.L12 Nodemon to restart the app
We use `npm install nodemon -g`.
Global utility in the machine, you run it from the terminal.
You can use it from the terminal `nodemon app.js`.

## S3.L13 Getting user input
When working with the terminal `node app.js list` we can access the additional "list" command line argument from our files with
```js
console.log(process.argv);
// argument vector (array)
```
We can get user input from the terminal like so
```js
var command = process.argv[2];
console.log('Command: ', command);

if (command === 'add') {
    console.log('Adding new note');
} else if (command === 'list') {
    console.log('Listing all notes');
} else if (command === 'read') {
    console.log('Reading');
} else if (command === 'remove') {
    console.log('Removing note');
} else {
    console.log('Command not recognized');
}
```

We can get even more previse with `node app.js remove --title="secret 2"` (make sure you use double quotes).
We will use the third party module called Yarg that will return an object.

## S3L14 Using Yargs
Install with `npm install yargs@4.7.1 --save`.

Here is the difference
```bash
// ♥ node app.js remove --title "secrets from the north"
starting app.js
starting notes.js
Command:  remove
Yargs { _: [ 'remove' ],
  title: 'secrets from the north',
  '$0': 'app.js' }
Removing note
```

Let's improve our notes.js exported functionalities. We can export an object that contains the function.
```js
var addNote = (title, body) => {
    console.log('Adding note: ', title, body);
};

var getAll = () => {
    console.log("Getting all notes")
}

var getNote = (title) => {
    console.log("Getting note:", title)
}

var removeNote = (title) => {
    console.log("Removing note:", title)
}

module.exports =  {
    addNote,
    // addNotes: addNote (in ES6)
    getAll, 
    getNote,
    removeNote
}
```
And use it in our app.js file (since we require notes.js).
```js
const yargs = require('yargs');

const notes = require('./notes.js');
const argv = yargs.argv;

var command = process.argv[2];
console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
    console.log('Adding new note');
    notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
    notes.getAll();
    console.log('Listing all notes');
} else if (command === 'read') {
    notes.getNote(argv.title);
    console.log('Reading');
} else if (command === 'remove') {
    notes.removeNote(argv.title);
    console.log('Removing note');
} else {
    console.log('Command not recognized');
}
```

We can get several inputs
```bash
node app.js add --title "secret" --body "this is my secret"
starting app.js
starting notes.js
Command:  add
Yargs { _: [ 'add' ],
  title: 'secret',
  body: 'this is my secret',
  '$0': 'app.js' }
Adding new note
Adding note:  secret this is my secret
```

## JSON
We know how to parse the input.
No we need to read and write JSON in our filesystem.

We can create objects in Javascript and use `JSON.stringify()` to turn them into a JSON string like
```json
{"name":"Bruno"}
```
Note how they use double quotes.

The other way round we can parse a JSON (JSON is just a string) to a javascript object using `JSON.parse()`.
```js
var personString = '{"name": "Bruno", "age": 20}';
var personObj = JSON.parse(personString);
```

Let's use the filesystem to write and read to a JSON file.
```js
const fs = require('fs');
var originalNote =  {
    title: "Some title",
    body: "Some body"
}

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync("notes.json", originalNoteString);

var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof noteString);
console.log(note.title);
```
We can `cd` in the playground folder and run `nodemon json.js`.

## S3L16 Adding and Saving Notes
We use a `try` (code that may or may not contain an error) and `catch` to make sure to create the file if it doesn't exist. 
```js
const fs = require('fs');

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title, // similar to     title: title   in ES6
        body
    };

    try {
        // (try to) get existing notes
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch(e) {
    }

    // add new note to the array
    notes.push(note);

    // update the file
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};
```

We can improve this by testing for existing title by adding
```js
const fs = require('fs');

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title, // similar to     title: title   in ES6
        body
    };

    try {
        // (try to) get existing notes
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    } catch(e) {
    }

    var duplicateNotes = notes.filter( (note) => note.title === title );
    if (duplicateNotes.length === 0) {
        // add new note to the array
        notes.push(note);

        // update the file
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    };
};
```

Note the similar code (ES6)
```js
    var duplicateNotes = notes.filter( (note) => {
        return note.title === title
    });

    // same as 
        var duplicateNotes = notes.filter( (note) => note.title === title );
```

## S3L17 Refactoring
We can refactor `fetchNotes()` and `saveNote()`.

## S3L18 Removing Notes
We can use `filter` to filter out by title.
```js
var removeNote = (title) => {
    var notes = fetchNotes();

    // filter notes, remove one with same title
    var filteredNotes = notes.filter( (note) => note.title !== title );

    // save new notes array
    saveNotes(filteredNotes);
    
    return notes.length !== filteredNotes.length;
}
```

And then print the right message based on the boolean returned by our `removeNote` function.
```js
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "Note not found" ;
    console.log(message);
```