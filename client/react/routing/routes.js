import { lazy, Suspense } from 'react'
import Root from './pages/Root'
import * as pages from './pages'

// Componenets must be exported as default
// If Component is imported somewhere in the bundle, it wont get code-splited
const AsyncComponent = lazy(() => import('./pages/Tasks/index.js'))

function Fallback()
{
	return <div>loading...</div>
}

function NotFound()
{
	return 'Not found'
}

export const routes = [
	{
		id: 'root',
		path: '/',
		element: <Root />,
		label: '',
		HydrateFallback: Fallback,
		meta: {
			title: 'Home'
		},
		children: [
			{
				id: 'tasks',
				path: 'tasks',
				label: 'tasks',	
				element: <Suspense fallback={<div>Loading...</div>}><AsyncComponent /></Suspense>,
				meta: {
					title: 'Tasks'
				}
			},
			{
				id: 'projetcs',
				path: 'projects',
				label: 'projects',	
				element: <pages.Projects />,
				meta: {
					title: 'Projects'
				},
				children: [
					{
						id: 'projectsProject',
						path: ':id',
						element: <pages.Projects />,
					}
				]
			},
			{
				id: 'knowledge',
				path: 'knowledge',
				label: 'knowledge',	
				element: <pages.Knowledge />,
				meta: {
					title: 'Knowledge'
				}
			},
		]
	},
	{
		id: 'notfound',
		path: '*',
		element: <NotFound />,
		meta: {
			title: 'Not Found'
		}
	}
]

const reduceToNav = (obj, parent = null) =>
	obj.reduce((result, item) => {
		if ((item.label || item.children)) {
			const { id, path, label, index, children } = item
			const reduced = { id, path: index ? parent.path : path, label, index }

			children && (reduced.children = reduceToNav(children, item))

			result.push(reduced)
		}

		return result
	}, [])

export const nav = reduceToNav(routes)