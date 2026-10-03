export const schema = `
    CREATE TABLE IF NOT EXISTS type (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS item (
        id SERIAL PRIMARY KEY,
        type_id INTEGER NOT NULL,
        title VARCHAR(255) NOT NULL,
        tree TEXT NOT NULL DEFAULT '{}',
        status VARCHAR(50),
        scheduled TIMESTAMP,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP,
        FOREIGN KEY(type_id) REFERENCES type(id)
    );

    CREATE TABLE item_parent (
        item_id        INTEGER NOT NULL REFERENCES item(id) ON DELETE CASCADE,
        parent_item_id INTEGER NOT NULL REFERENCES item(id) ON DELETE CASCADE,

        PRIMARY KEY (item_id, parent_item_id)
    );
`

export const migrations = [

]