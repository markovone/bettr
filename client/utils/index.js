import { matchRoutes } from 'react-router'
import { routes } from '../react/routing/routes'

export const matchRoute = (path) => matchRoutes(routes, path)
    .find(route => route.pathname === path)
    .route