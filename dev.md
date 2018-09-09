## Modules in node
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
