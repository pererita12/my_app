import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors())

app.get('/api/digimon', async (request, response) => {
    const data: Array<any> = [];
    response.send(data)
});

app.listen(port, () => {
    console.log(`SERVER LISTENING AT PORT ${port}`)
})