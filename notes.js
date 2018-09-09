console.log("starting notes.js");

// console.log(module);

module.exports.age = 25;

// the arrow function can replace any anonymous function easily
// however it doesn't bind this
module.exports.addNote = () => {
    console.log("Add Note");
    return "New Note";
};

module.exports.add = (a, b) => {
    return a + b;
};