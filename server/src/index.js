import express from 'express'
import fs from 'fs'
import https from 'https'
import ReactDOMServer from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from '../../client/react/routing/routes.js'
import Document from './Document.js'
import { matchRoute } from '../../client/utils/index.js'
import oAuthSecret from '../../secret/oauth.js'

const app = express()
const ssr = false
let appSSR = null

app.use('/', express.static('../client/dist'))
app.use(express.json())


app.get('/auth/oauth2callback', async (req, res) => {

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

app.get('*', async (req, res) => {
	if (ssr) {
		const handler = createStaticHandler(routes)
		const fetchRequest = createFetchRequest(req)
		const context = await handler.query(fetchRequest)

		const router = createStaticRouter(
			handler.dataRoutes,
			context
		)

		appSSR = <StaticRouterProvider router={ router } context={ context } />
	}

	const title = matchRoute(req.path).meta.title
    
    const html = ReactDOMServer.renderToString(
        <Document title={ title } app={ appSSR } />
    )


	res.send('<!DOCTYPE html>' + html)
})

const options = {
    key: fs.readFileSync('../secret/key.pem', 'utf8'),
    cert: fs.readFileSync('../secret/cert.pem', 'utf8')
}

const server = https.createServer(options, app)

server.listen(443, () => {
    console.log('https://bttr.cz')
})


function createFetchRequest(req) 
{
    let origin = `${req.protocol}://${req.get("host")}`;
    // Note: This had to take originalUrl into account for presumably vite's proxying
    let url = new URL(req.originalUrl || req.url, origin);
  
    let controller = new AbortController();
    req.on("close", () => controller.abort());
  
    let headers = new Headers();
  
    for (let [key, values] of Object.entries(req.headers)) {
      if (values) {
        if (Array.isArray(values)) {
          for (let value of values) {
            headers.append(key, value);
          }
        } else {
          headers.set(key, values);
        }
      }
    }
  
    let init = {
      method: req.method,
      headers,
      signal: controller.signal,
    };
  
    if (req.method !== "GET" && req.method !== "HEAD") {
      init.body = req.body;
    }
  
    return new Request(url.href, init);
}