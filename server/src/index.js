import express from 'express'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from '../../client/react/routing/routes.js'
import Document from './Document.js'

const server = express()

let handler = createStaticHandler(routes)


server.use('/', express.static('../client/dist'))

server.get('*', async (req, res) => {
    const fetchRequest = createFetchRequest(req)
    const context = await handler.query(fetchRequest)

    const router = createStaticRouter(
        handler.dataRoutes,
        context
    )

	const html = ReactDOMServer.renderToString(<Document title="bettr" />)

	res.send('<!DOCTYPE html>' + html)

    // const html = '<!DOCTYPE html>'+
    //     ReactDOMServer.renderToString(
    //         <StaticRouterProvider router={ router } context={ context } />
    //     )

	// fs.readFile('../client/index.html', (err, data) => {
	// 	if (!err) {
	// 		res.set('Content-Type', 'text/html')
	// 		res.send(data.toString())
	// 	}
	// })
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