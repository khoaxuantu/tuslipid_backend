const express = require('express');
const router = express.Router();
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

require('dotenv').config();
const { CLIENT_ID, CLIENT_SECRET } = process.env;

router.get('/getGithubAccessToken', async (req, res) => {
    console.log(req.query.code);
    const params = "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code=" + req.query.code;

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

router.get('/getGitubUserData', async (req, res) => {
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

module.exports = router;