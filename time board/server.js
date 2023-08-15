import { createServer } from 'http';
import { readFile } from 'fs';

const hostname = '127.0.0.1';
const port = 5500;
const port2 = 3000;

const server = createServer((req, res) => {
    if (req.url === '/data') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin

        readFile('data.json', 'utf-8', (error, data) => {
            if (error) {
                console.log("Error reading file");
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                return;
            }

            const jsonData = JSON.parse(data);
            res.end(JSON.stringify(jsonData));
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.listen(port2, hostname, () => {
    console.log(`Server running at http://${hostname}:${port2}/`);
});

