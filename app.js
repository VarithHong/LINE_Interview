const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const EventSource = require("eventsource");

app.get('/getMessage', (req, res) => {

});

app.post('/postMessage', (req, res) => {
    
});

app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening on port 3000");
});