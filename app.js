console.log("starting app.js");

// file system is built in
const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

var user = os.userInfo();
// console.log(user);

console.log(notes.age);

// fs.appendFile('greetings.txt', `Hello ${user.username}, you are ${notes.age}`, function (err) {
//     if (err) {
//         console.log(err);
//     }
// });

var res = notes.addNote();
console.log(res);

var sum = notes.add(3, 3);
console.log(sum);