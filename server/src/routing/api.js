import express from 'express'
import { queryDb } from '../db/connection'
import { schema } from '../db/schema'
import { collections } from '../db/data-app.js'

const api = express.Router()

const selectCollectionItem = (collectionName='', itemId) => 
{
	const types = collections[collectionName].types

	return {
		text: `
			SELECT
				i.*,
				t.name AS type
			FROM item i
			JOIN type t ON i.type_id = t.id
			WHERE 
				i.id = $2
				OR 
				t.name = ANY($1)
			ORDER BY COALESCE(i.edited, i.created) DESC, i.id DESC
			LIMIT 10
		;`,
		values: [ types, itemId ]
	}
}


api.get('/api/collection/:collection_name?/:item_id?', async (req, res) => {
	
    const { collection_name, item_id } = req.params
    const query = selectCollectionItem(collection_name, item_id)

    queryDb(query).then(rows => {
        res.json(rows.rows)
    })
})


api.post('/api/collection/:collection_name/:item_id', async (req, res) => {
	try {
		const { item_id } = req.params
		const { title, tree } = req.body

		if (title && tree) {
			await queryDb({
				text: `
					UPDATE item 
					SET 
						title = $2, 
						tree = $3, 
						edited = NOW() 
					WHERE id = $1
				`,
				values: [ item_id, title, tree ]
			})

			res.json({ success: true, itemId: item_id })
		}
	}
	catch (error) {
		res.status(500).json({ error: error.message })
	}
})

export { api }