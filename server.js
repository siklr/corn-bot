const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log('Listening for HTTP requests on port 5000.');
});