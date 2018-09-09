console.log("starting app");

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