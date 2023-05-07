const express = require('express');
const router = express.Router();
const { OAuth2Client, } = require('google-auth-library');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));

const { 
    GITHUB_CLIENT_ID, 
    GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET 
} = process.env;

const fetchUserAPI = {
    "google": "https://www.googleapis.com/oauth2/v3/userinfo",
    "github": "https://api.github.com/user"
}

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
            // console.log(data);
            res.json(data);
        })
    } catch (error) {
        console.log(error);
    }
});

router.get('/google/access_token', async (req, res) => {
    console.log(req.query.code);

    try {
        const { tokens } = await oAuth2Client.getToken(req.query.code);
        // console.log(tokens);
        
        res.json(tokens);
    } catch (error) {
        console.log(error);
    }
})

router.get(`/:thirdParty/user`, async (req, res) => {
    req.get("Authorization");
    try {
        await fetch(fetchUserAPI[req.params.thirdParty], {
            method: "GET",
            headers: {
                "Authorization": req.get("Authorization")
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.login === undefined ? data.name : data.login);
            res.json(data);
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;