import { useRevalidator } from 'react-router'

export const handleSave = async (url, { id, title, tree }) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id ?? null,
            title,
            tree: JSON.stringify(tree)
        })
    })

    if (!response.ok) {
        throw new Error(`Save failed: ${ response.status } ${ response.statusText }`)
    }

    return response.json()
}

// Wraps handleSave with a revalidation so route loader data (the item list)
// reflects the saved title/tree. Kept out of the component to avoid threading
// useRevalidator through every caller.
export const useSave = () => {
    const { revalidate } = useRevalidator()

    return async (url, item) => {
        const result = await handleSave(url, item)

        revalidate()
        
        return result
    }
}
