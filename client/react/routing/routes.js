import { lazy, Suspense } from 'react'
import Root from './pages/Root'
import * as pages from './pages'
import { collections } from '../../../server/src/db/data-app.js'


export const categories = [ 'tasks', 'projects', 'knowledge', 'health', 'money' ]

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

async function loader ({ params, request }) 
{
	const { collection_name = '', item_id } = params

	if (!collections[collection_name]) {
		throw new Response("Not Found", { status: 404 });
	}

	const url = '/api/collection' 
		+ (collection_name ? `/${collection_name}` : '') 
		+ (item_id ? `/${item_id}` : '')

	const res = await fetch(url)
	const resJson = await res.json()

	// console.log('loader', { params, request, resJson })

	return resJson
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
				id: 'CollectionItem',
				path: '/:collection_name?/:item_id?',
				label: 'Collection Item',	
				element: <pages.Collection />,
				meta: {
					title: 'Collection Item'
				},
				loader: loader,
				shouldRevalidate: ({ currentParams, nextParams, currentUrl, nextUrl }) => {
					// Forced revalidation (useRevalidator) keeps the URL unchanged — allow it.
					const isForcedRevalidation =
						currentUrl.pathname === nextUrl.pathname &&
						currentUrl.search === nextUrl.search

					return (
						isForcedRevalidation
						||
						currentParams.collection_name !== nextParams.collection_name
						||
						currentUrl.search !== nextUrl.search
					)
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