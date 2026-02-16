export const schema = `
    CREATE TABLE IF NOT EXISTS type (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS item (
        id SERIAL PRIMARY KEY,
        type_id INTEGER NOT NULL,
        title VARCHAR,
        state INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited_at TIMESTAMP,
        FOREIGN KEY(type_id) REFERENCES type(id)
    );

    CREATE TABLE IF NOT EXISTS component (
        id SERIAL PRIMARY KEY,
        tree JSONB NOT NULL DEFAULT '{}'
    );

    CREATE TABLE IF NOT EXISTS item_component (
        item_id INT NOT NULL,
        component_id INT NOT NULL,
        subitem_id VARCHAR,
        PRIMARY KEY (item_id, component_id),
        FOREIGN KEY (item_id) REFERENCES item(id) 
            ON DELETE CASCADE,
        FOREIGN KEY (component_id) REFERENCES component(id) 
            ON DELETE CASCADE
    );

    CREATE INDEX idx_item_type_id
        ON item(type_id);

    CREATE INDEX IF NOT EXISTS idx_item_component_component_id 
        ON item_component(component_id);
`

export const migrations = [

]