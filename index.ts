import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const port = 4000;
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg =
                "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}))

app.get('/api/digimon', (request, response) => {
    const raw = fs.readFileSync('./server/resources/digimon.json', 'utf-8');
    const data = JSON.parse(raw);
    response.send(data)
    response.end();
});

app.listen(port, () => {
    console.log(`SERVER LISTENING AT PORT ${port}`)
})