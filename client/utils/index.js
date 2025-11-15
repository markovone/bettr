import { matchRoutes } from 'react-router'
import { routes } from '../react/routing/routes'

export const matchRoute = (path) => matchRoutes(routes, window.location.pathname)
    .find(route => route.pathname === window.location.pathname)
    .route


export const arrayFromRange = (start, stop, fn) => Array.from(
	{ length: stop - start + 1 },
	(v, i) => fn ? fn(start + i) : start + i
)

export const findBranch = (arr, id) => {
	for (const el of arr) {
		if (el.id === id) {
			return el
		}

		if (el.children) {
			const result = findBranch(el.children, id)

			if (result) {
				return result
			}
		}
	}

	return null
}


export function camelCaseToArray(string)
{
	return string.split(/(?=[A-Z])/)
}   