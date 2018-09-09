console.log("starting app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const argv = yargs.argv;

// var command = process.argv[2];
var command = argv._[0];

console.log('Command: ', command);
console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    console.log(note ? 'Adding new note' : "Note title taken");
} else if (command === 'list') {
    notes.getAll();
    console.log('Listing all notes');
} else if (command === 'read') {
    notes.getNote(argv.title);
    console.log('Reading');
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Note was removed" : "Note not found" ;
    console.log(message);
} else {
    console.log('Command not recognized');
}