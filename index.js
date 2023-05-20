const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const guestbook = require('./routers/guestbook');
const oauth = require('./routers/oauth');

const app = express();
const port = parseInt(process.env.PORT) || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "https://xuankhoatu.com"],
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://xuankhoatu.com');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Control-Allow-Headers,Authorization');
//     next();
//   });

app.use("/guestbook", guestbook);
app.use("/oauth", oauth);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
})