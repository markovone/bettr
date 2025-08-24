import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from '../../client/react/routing/routes.js'
import Document from './Document.js'
import { matchRoute } from '../../client/utils/index.js'

const server = express()
const ssr = false
let appSSR = null


server.use('/', express.static('../client/dist'))

server.get('*', async (req, res) => {
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


server.listen(3000, () => {
    console.log('Listenning on port 3000.')
    console.log('http://localhost:3000/')
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