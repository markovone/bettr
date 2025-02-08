import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { routes } from './routing/routes'
import '../scss/index.scss'

createRoot(document.body).render(
    <RouterProvider router={ createBrowserRouter(routes)} />
)
