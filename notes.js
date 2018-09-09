console.log("starting notes.js");

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