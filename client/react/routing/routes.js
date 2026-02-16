import { lazy, Suspense } from 'react'
import Root from './pages/Root'
import * as pages from './pages'


// Componenets must be exported as default
// If Component is imported somewhere in the bundle, it wont get code-splited
const AsyncComponent = lazy(() => import('./pages/Projects/index.js'))

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
				id: 'Tasks',
				path: '/tasks/:date?',
				label: 'tasks',	
				element: <pages.Tasks />,
				meta: {
					title: 'Tasks'
				},
				loader: async ({ params }) => {
					const res = await fetch(`/api/tasks`)
					const resJson = await res.json()
			
					return []
				},
				children: [
					{
						id: 'TasksItem',
						path: '/tasks/:date?/:id',
						element: <pages.TasksItem />,
						meta: {
							title: 'Tasks item'
						},			
					},
				]
			},
			{
				id: 'Projetcs',
				path: '/projects',
				label: 'projects',	
				element: <Suspense fallback={<div>Loading...</div>}><AsyncComponent /></Suspense>,
				meta: {
					title: 'Projects'
				},
				children: [
					{
						id: 'ProjectsItem',
						path: '/projects/:id',
						element: <pages.ProjectsItem />,
						meta: {
							title: 'Projects Item'
						},						
					},
				]
			},
			{
				id: 'Knowledge',
				path: '/knowledge',
				label: 'knowledge',	
				element: <pages.Knowledge />,
				meta: {
					title: 'Knowledge'
				},
				loader: async ({ params }) => {
					const res = await fetch(`/api/knowledge`)
					const resJson = await res.json()
			
					return resJson
				},
				children: [
					{
						id: 'KnowledgeItem',
						path: '/knowledge/:id',
						element: <pages.KnowledgeItem />,
						meta: {
							title: 'Knowledge Item'
						}				
					},
				]				
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