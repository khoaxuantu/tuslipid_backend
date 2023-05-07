const express = require('express');
const router = express.Router();

const guestbook = require("../services/guestbook_api");

const maxMsgLength = 512;

router.get('/list/:startId', (req, res) => {
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

router.post('/add', (req, res) => {
    const content = req.body;
    console.log(content);
    if (content.message.length > maxMsgLength) {
        res.status(403).send({
            message: "The submitted message exceeds the maximum character"
        })
    }

    guestbook.addGuestbook(content)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
    // res.status(200).send({
    //     message: "Submit successfully!"
    // });
});

module.exports = router;