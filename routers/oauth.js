const express = require('express');
const router = express.Router();
const { OAuth2Client, } = require('google-auth-library');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

require('dotenv').config();
const { 
    GITHUB_CLIENT_ID, 
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET 
} = process.env;

const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'postmessage',
);

router.get('/github/access_token', async (req, res) => {
    console.log(req.query.code);
    const params = "?client_id=" + GITHUB_CLIENT_ID + "&client_secret=" + GITHUB_CLIENT_SECRET + "&code=" + req.query.code;

    try {
        await fetch("https://github.com/login/oauth/access_token" + params, {
            method: "POST",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            res.json(data);
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/github/user', async (req, res) => {
    req.get("Authorization"); // Bearer ACCESSTOKEN
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        res.json(data);
    })
});

router.get('/google/access_token', async (req, res) => {
    console.log(req.query.code);

    const { tokens } = await oAuth2Client.getToken(req.query.code);
    console.log(tokens);

    res.json(tokens);
})

module.exports = router;