import express from 'express'
import { Client } from 'pg'


const test = express.Router()

test.get('/test', async (req, res) => {

    res.json({ message: 'Test route working' })
    
})

export { test }