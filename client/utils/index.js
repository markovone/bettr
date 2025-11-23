import { matchRoutes } from 'react-router'
import { routes } from '../react/routing/routes'

// path parametr for SSR, window object undefined
export const matchRoute = (path = window && window.location.pathname) => 
{
	return matchRoutes(routes, path)
		.find(route => route.pathname === path)
		.route
}

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

export function createFetchRequest(req) 
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