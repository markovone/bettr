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
				id: 'Tasks',
				path: 'tasks',
				label: 'tasks',	
				element: <Suspense fallback={<div>Loading...</div>}><AsyncComponent /></Suspense>,
				meta: {
					title: 'Tasks'
				},
				children: [
					{
						id: 'TasksItem',
						path: ':id',
						element: <pages.TasksItem />,
						meta: {
							title: 'Tasks Item'
						},						
					}
				]
			},
			{
				id: 'Projetcs',
				path: 'projects',
				label: 'projects',	
				element: <pages.Projects />,
				meta: {
					title: 'Projects'
				},
				children: [
					{
						id: 'ProjectsItem',
						path: ':id',
						element: <pages.ProjectsItem />,
						meta: {
							title: 'Projects Item'
						},						
					},
				]
			},
			{
				id: 'Knowledge',
				path: 'knowledge',
				label: 'knowledge',	
				element: <pages.Knowledge />,
				meta: {
					title: 'Knowledge'
				},
				children: [
					{
						id: 'KnowledgeItem',
						path: ':id',
						element: <pages.KnowledgeItem />,
						meta: {
							title: 'Knowledge Item'
						},						
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