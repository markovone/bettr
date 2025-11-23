export const schema = [
    `CREATE TABLE IF NOT EXISTS item (
    id SERIAL PRIMARY KEY,
    type_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    state INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`,

    `CREATE TABLE IF NOT EXISTS type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL);`,

    `ALTER TABLE item
    ADD CONSTRAINT fk_type
    FOREIGN KEY(type_id) 
    REFERENCES type(id);`,

    `CREATE INDEX idx_item_type_id
    ON item(type_id);`
]

export const migrations = [

]