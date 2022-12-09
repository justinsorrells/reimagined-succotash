const http = require("http"); // Import the Node.js http module

const host = 'localhost'; // Delcare a host IP address or DNS name
const port = 8000; // Declare a port to bind to

// Callback function passed to the server
const requestListener = function(req, res) {
    res.setHeader("Content-Type", "application/json"); // setHeader method takes header's name and value as args
    // Content-Type header is used to indicate the format of the data, also known as the media type
    res.writeHead(200);
    res.end(`{"message": "This is a JSON response"}`);
};

// Create a server object with the http module and pass in a call back function
const server = http.createServer(requestListener);
// Listen on the server object. Pass in a port and IP address to bind to
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});