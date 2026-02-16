

export default {
    select:`
        SELECT
            i.id            AS item_id,
            i.title,
            i.state,
            i.created_at,
            i.edited_at,

            c.id            AS component_id,
            c.tree          AS component_tree,

            ic.subitem_id
        FROM item i
        JOIN item_component ic
            ON ic.item_id = i.id
        JOIN component c
            ON c.id = ic.component_id
        ;`,
    add: `
        WITH 
        new_item AS (
            INSERT INTO item (type_id, title)
            VALUES (1, 'Another Document Title')
            RETURNING id
        ),
        new_component AS (
            INSERT INTO component (tree)
            VALUES (
            '{
                "props": { "type": "root" },
                "0": { "props": { "type": "p" }, "text": "Paragraph Text" }
            }'
            )
            RETURNING id
        )

        INSERT INTO item_component (item_id, component_id)
        SELECT new_item.id, new_component.id
        FROM new_item, new_component;`,
    populate:
        `WITH 
            new_type AS (
                INSERT INTO type (name) VALUES ('Document') 
                RETURNING id
            ),
            new_item AS (
                INSERT INTO item (type_id, title)
                SELECT id, 'Document Title' FROM new_type
                RETURNING id
            ),
            new_component AS (
                INSERT INTO component (tree)
                VALUES (
                '{
                    "props": { "type": "root" },
                    "0": { "props": { "type": "h1" }, "text": "Title" }
                }'::jsonb
                )
                RETURNING id
            )

            INSERT INTO item_component (item_id, component_id)
            SELECT new_item.id, new_component.id
            FROM new_item, new_component;`,
    relationsToObject: `
        SELECT
            i.id,
            i.title,
            i.state,
            i.created_at,
            i.edited_at,
            jsonb_agg(
                jsonb_build_object(
                    'id', c.id,
                    'tree', c.tree,
                    'subitem_id', ic.subitem_id
                )
                ORDER BY c.id
            ) AS components
        FROM item i
        JOIN item_component ic
            ON ic.item_id = i.id
        JOIN component c
            ON c.id = ic.component_id
        WHERE i.id = 1
        GROUP BY i.id;
    `
}

