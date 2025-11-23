import express from 'express'
import oAuthSecret from '../../../secret/oauth.js'

const auth = express.Router()

auth.get('/auth/oauth2callback', async (req, res) => {

    const params = new URLSearchParams({
        code: req.query.code,
        client_id: oAuthSecret.youtube.clientID,
        client_secret: oAuthSecret.youtube.clientSecret,
        redirect_uri: 'https://bttr.cz/auth/oauth2callback',
        grant_type: 'authorization_code',
    })

    fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
    })
    .then(res => res.json())
    .then(data => {
        res.cookie('access_token', data.access_token)

        return res.redirect(req.query.state)
    })
})

export { auth }