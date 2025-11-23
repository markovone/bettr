import express from 'express'
import { queryDb } from '../db/connection'
import { schema } from '../db/schema'

const api = express.Router()

api.get('/api/tasks', async (req, res) => {
    queryDb(
        `SELECT
            i.id,
            i.title,
            i.state,
            i.created_at,
            t.name as type_name
        FROM
            item i
        JOIN
            type t ON i.type_id = t.id
        ORDER BY
            i.state DESC;`
    ).then(rows => {
        res.json(rows.rows)
    })
})

api.get('/api/db/create', async (req, res) => {
    schema.forEach(async (query) => {
        await queryDb(query)
    })

    res.json({ message: 'Schema created' })
})

export { api }