const http = require('http');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write("hello world");
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 3, 4, 6]));
        res.end();
    }


});




server.listen(3004);
console.log("listening on port 3004");
