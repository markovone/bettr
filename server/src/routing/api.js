import express from 'express'
import { queryDb } from '../db/connection'
import { schema } from '../db/schema'

const api = express.Router()

api.get('/api/item', async (req, res) => {
    queryDb(`
        SELECT
            i.id             AS item_id,
            i.title,
            i.state,
            i.created_at,
            i.edited_at,

            c.id             AS component_id,
            c.tree           AS component_tree,

            ic.subitem_id
        FROM item i
        JOIN item_component ic
            ON ic.item_id = i.id
        JOIN component c
            ON c.id = ic.component_id
        ;`).then(rows => {
        res.json(rows.rows)
    })
})

api.get('/api/tasks', async (req, res) => {
   queryDb(`
        SELECT
            i.id             AS item_id,
            i.title,
            i.state,
            i.created_at,
            i.edited_at,

            c.id             AS component_id,
            c.tree           AS component_tree,

            ic.subitem_id
        FROM item i
        JOIN item_component ic
            ON ic.item_id = i.id
        JOIN component c
            ON c.id = ic.component_id
        WHERE i.id = 3
        ;`).then(rows => {
        res.json(rows.rows)
    })
})

api.get('/api/knowledge', async (req, res) => {
	queryDb(`
		SELECT
			i.id             AS item_id,
			i.title,
			i.state,
			i.created_at,
			i.edited_at,
			t.name           AS type_name,
			c.id             AS component_id,
			c.tree           AS component_tree,
			ic.subitem_id
		FROM item i
		JOIN type t
			ON t.id = i.type_id
		LEFT JOIN item_component ic
			ON ic.item_id = i.id
		LEFT JOIN component c
			ON c.id = ic.component_id
		WHERE t.name = 'knowledge'
		ORDER BY i.created_at DESC
		;`
	).then(rows => {
		res.json(rows.rows)
	})
})

api.post('/api/knowledge/save', async (req, res) => {
	try {
		const { itemId, title, tree } = req.body

		if (itemId) {
			// UPDATE existing item

			// 1. Update item title if provided
			if (title) {
				await queryDb(
					`UPDATE item SET title = $1, edited_at = NOW() WHERE id = $2;`,
					[title, itemId]
				)
			}

			// 2. Find existing component_id for this item
			const componentResult = await queryDb(
				`SELECT component_id FROM item_component WHERE item_id = $1;`,
				[itemId]
			)

			if (componentResult.rows.length > 0) {
				// Update existing component
				const componentId = componentResult.rows[0].component_id
				await queryDb(
					`UPDATE component SET tree = $1 WHERE id = $2;`,
					[JSON.stringify(tree), componentId]
				)
			} else {
				// Create new component and link it
				const newComponentResult = await queryDb(
					`INSERT INTO component (tree) VALUES ($1) RETURNING id;`,
					[JSON.stringify(tree)]
				)
				const componentId = newComponentResult.rows[0].id

				await queryDb(
					`INSERT INTO item_component (item_id, component_id, subitem_id) VALUES ($1, $2, NULL);`,
					[itemId, componentId]
				)
			}

			res.json({ success: true, itemId })

		} else {
			// CREATE new item

			// 1. Get knowledge type_id
			const typeResult = await queryDb(
				`SELECT id FROM type WHERE name = 'knowledge';`
			)
			const typeId = typeResult.rows[0].id

			// 2. Create new item
			const itemResult = await queryDb(
				`INSERT INTO item (type_id, title) VALUES ($1, $2) RETURNING id;`,
				[typeId, title || 'Untitled']
			)
			const newItemId = itemResult.rows[0].id

			// 3. Create component with tree
			const componentResult = await queryDb(
				`INSERT INTO component (tree) VALUES ($1) RETURNING id;`,
				[JSON.stringify(tree)]
			)
			const componentId = componentResult.rows[0].id

			// 4. Link item and component
			await queryDb(
				`INSERT INTO item_component (item_id, component_id, subitem_id) VALUES ($1, $2, NULL);`,
				[newItemId, componentId]
			)

			res.json({ success: true, itemId: newItemId })
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})



api.get('/api/db/create', async (req, res) => {
    schema.forEach(async (query) => {
        await queryDb(query)
    })

    res.json({ message: 'Schema created' })
})

api.get('/api/db-reset', async (req, res) => {
	try {
		// 1. Empty all tables except type
		await queryDb('TRUNCATE item_component, component, item CASCADE;')

		// 2. Create new type 'knowledge'
		const typeResult = await queryDb(
			`INSERT INTO type (name) VALUES ('knowledge') RETURNING id;`
		)
		const typeId = typeResult.rows[0].id

		// 3. Create new item with title 'Testing item'
		const itemResult = await queryDb(
			`INSERT INTO item (type_id, title) VALUES ($1, $2) RETURNING id;`,
			[typeId, 'Testing item']
		)
		const itemId = itemResult.rows[0].id

		// 4. Create component with initialValue tree
		const initialValue = [
			{
				type: 'heading-1',
				children: [{ text: 'Main Heading' }],
			},
			{
				type: 'paragraph',
				children: [
					{ text: 'This is a paragraph with a ' },
					{
						type: 'link',
						url: 'https://example.com',
						children: [{ text: 'link inside' }],
					},
					{ text: ' it.' },
				],
			},
			{
				type: 'bulleted-list',
				children: [
					{
						type: 'list-item',
						children: [
							{
								type: 'list-item-content',
								children: [
									{
										type: 'paragraph',
										children: [{ text: 'foo' }],
									},
									{
										type: 'paragraph',
										children: [{ text: 'container' }],
									},
								],
							},
						],
					},
					{
						type: 'list-item',
						children: [
							{
								type: 'list-item-content',
								children: [
									{
										type: 'paragraph',
										children: [{ text: 'bar' }],
									},
								],
							},
							{
								type: 'bulleted-list',
								children: [
									{
										type: 'list-item',
										children: [
											{
												type: 'list-item-content',
												children: [
													{
														type: 'paragraph',
														children: [{ text: 'bar.foo' }],
													},
												],
											},
										],
									},
									{
										type: 'list-item',
										children: [
											{
												type: 'list-item-content',
												children: [
													{
														type: 'paragraph',
														children: [{ text: 'bar.bar' }],
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		]

		const componentResult = await queryDb(
			`INSERT INTO component (tree) VALUES ($1) RETURNING id;`,
			[JSON.stringify(initialValue)]
		)
		const componentId = componentResult.rows[0].id

		// 5. Link item and component with subitem_id null
		await queryDb(
			`INSERT INTO item_component (item_id, component_id, subitem_id) VALUES ($1, $2, NULL);`,
			[itemId, componentId]
		)

		res.json({
			message: 'Database reset complete',
			data: {
				typeId,
				itemId,
				componentId,
			},
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

export { api }