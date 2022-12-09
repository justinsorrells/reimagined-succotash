const http = require("http"); // Import the Node.js http module

const host = 'localhost'; // Delcare a host IP address or DNS name
const port = 8000; // Declare a port to bind to

// Callback function passed to the server
const requestListener = function(req, res) {
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment;filename=oceanpals.csv") // Content-Disposition tells the broswer how to display the data, particularly in the browser or as a separate file
    res.writeHead(200);
    res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
};

// Create a server object with the http module and pass in a call back function
const server = http.createServer(requestListener);
// Listen on the server object. Pass in a port and IP address to bind to
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});