const express = require('express');
const router = express.Router();

const guestbook = require("../services/guestbook_api");

const maxMsgLength = 512;

router.get('/list/:startId', (req, res) => {
    guestbook.getGuestbookContent(req.params.startId)
    .then(response => {
        console.log(`-- GET 200: /guestbook/list | fetch from row ${req.params.startId}`);
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(`-- GET 500: /guestbook/list`);
        res.status(500).send(error);
    });
});

router.post('/add', (req, res) => {
    const content = req.body;
    if (content.message.length > maxMsgLength) {
        console.log(`-- GET 400: /guestbook/add`)
        res.status(400).send({
            message: "The submitted message exceeds the maximum character"
        })
    }

    guestbook.addGuestbook(content)
    .then(response => {
        console.log(`-- GET 200: /guestbook/add | Submitted successfully`);
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(`-- GET 500: /guestbook/add`);
        res.status(500).send(error);
    });
});

router.get('/totalRecords', (req, res) => {
    guestbook.getTotalRecords()
    .then(response => {
        console.log("-- GET 200: /guestbook/totalGuests | total guest")
        res.status(200).send(response);
    })
    .catch(error => {
        console.log("-- GET 500: /guestbook/totalGuests")
        res.status(500).send(error);
    });
});

module.exports = router;