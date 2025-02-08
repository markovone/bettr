import { lazy, Suspense } from 'react'
import Dashboard from './pages/Dashboard'
import Root from './pages/Root'

const AsyncComponent = lazy(() => import('./pages/About'))

function Fallback()
{
	return <div>loading...</div>
}

export const routes = [
	{
		id: 'root',
		path: '/',
		element: <Root />,
		label: '',
		HydrateFallback: Fallback,
		children: [
			{
				id: 'dashboard',
				path: 'dashboard',
				label: 'dashboard',	
				element: <Dashboard />,
				loader: async ({ params }) => {
					const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
					const resJson = await res.json()
				  
					return resJson
				},
			},
			{
				id: 'about',
				path: 'about',
				label: 'about',	
				element: <Suspense fallback={<div>loading</div>}><AsyncComponent /></Suspense>,
			},

		]
	},
]