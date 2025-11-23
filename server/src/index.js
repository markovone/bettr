import express from 'express'
import fs from 'fs'
import https from 'https'
import * as route from './routing'

const app = express()

app.use('/', express.static('../client/dist'))
app.use(express.json())

app.use(route.auth)
app.use(route.api)
app.use(route.test)
app.use(route.rest)


const options = {
    key: fs.readFileSync('../secret/key.pem', 'utf8'),
    cert: fs.readFileSync('../secret/cert.pem', 'utf8')
}

const server = https.createServer(options, app)

server.listen(443, () => {
    console.log('https://bttr.cz')
})


