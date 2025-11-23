import express from 'express'
import ReactDOMServer from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from '../../../client/react/routing/routes.js'
import Document from './../Document.js'
import { matchRoute, createFetchRequest } from '../../../client/utils'


const rest = express.Router()

const ssr = false
let appSSR = null

rest.get('*', async (req, res) => {
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

export { rest }