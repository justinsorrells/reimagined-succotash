const http = require("http"); // Import the Node.js http module
const fs = require('fs').promises; // Import the Node.js file module to use the readFile() function
// We are using promises because they are syntactically more succint than callbacks

const host = 'localhost'; // Delcare a host IP address or DNS name
const port = 8000; // Declare a port to bind to

let indexFile;

// Callback function passed to the server
const requestListener = function(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
};

// Create a server object with the http module and pass in a call back function
const server = http.createServer(requestListener);

fs.readFile("/Users/Dani/reimagined-succotash/scrollingGame/index.html") // Read data into file
    .then(contents => { // Promise
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        console.error(`Could not read index.html file: ${err}`);
        process.exit(1);
    });
// Listen on the server object. Pass in a port and IP address to bind to
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });