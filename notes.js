console.log("starting notes.js");

const fs = require('fs');

var fetchNotes = () => {
    try {
        // (try to) get existing notes
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e) {
        return [];
    }
}

var saveNotes = (notes) => {
    // update the file
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title, // similar to     title: title   in ES6
        body
    };

    var duplicateNotes = notes.filter( (note) => note.title === title );
    if (duplicateNotes.length === 0) {
        // add new note to the array
        notes.push(note);
        saveNotes(notes);
        return note;
    };
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