const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const guestbook = require('./routers/guestbook.js');
const oauth = require('./routers/oauth');

const app = express();
const port = 3001;

// app.use(cors);
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });

// app.use("/guestbook", guestbook);
app.use("/oauth", oauth);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})