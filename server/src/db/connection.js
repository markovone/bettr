import { Client } from 'pg'

const db = new Client({
    user: 'postgres',
    password: 'pokoki',
    host: 'localhost',
    database: 'bttr',
})

db.connect()

export function queryDb(queryWithparams) {
    return db.query(queryWithparams)
}
