const express = require('express');
const router = express.Router();

const guestbook = require("../services/guestbook_api");

app.get('/list/:startId', (req, res) => {
    guestbook.getGuestbookContent(req.params.startId)
    .then(response => {
        console.log(response);
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
});

app.post('/add', (req, res) => {
    guestbook.addGuestbook(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

module.exports = router;