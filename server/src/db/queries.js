

export default {
    neInsert: `
        INSERT INTO type (name) VALUES
            ('task'),
            ('project'),
            ('document'),
            ('note'),
            ('link'),
            ('video'),
            ('image');

        INSERT INTO item (type_id, title, tree, status, scheduled)
        VALUES
            (1, 'Finish PostgreSQL schema',
            '[
                {"type":"paragraph","children":[{"text":"Finalize tables, indexes, and constraints for the schema."}]},
                {"type":"bulleted-list","children":[
                    {"type":"list-item","children":[{"text":"Define item and item_type tables"}]},
                    {"type":"list-item","children":[{"text":"Add foreign keys and indexes"}]},
                    {"type":"list-item","children":[{"text":"Write migration scripts"}]}
                ]}
            ]', 'todo', NULL),

            (1, 'Write React Router tests',
            '[
                {"type":"paragraph","children":[{"text":"Add test coverage for routing behavior."}]},
                {"type":"bulleted-list","children":[
                    {"type":"list-item","children":[{"text":"Test nested route rendering"}]},
                    {"type":"list-item","children":[{"text":"Test loader and action functions"}]},
                    {"type":"list-item","children":[{"text":"Test redirect and error boundaries"}]}
                ]}
            ]', 'in-progress', NULL),

            (2, 'Personal knowledge base',
            '[
                {"type":"heading-one","children":[{"text":"Personal Knowledge Base"}]},
                {"type":"paragraph","children":[{"text":"A place to collect notes, references, and ideas across projects."}]}
            ]', 'active', NULL),

            (2, 'Website redesign',
            '[
                {"type":"heading-one","children":[{"text":"Website Redesign"}]},
                {"type":"paragraph","children":[{"text":"Refresh the visual design and improve navigation across the site."}]}
            ]', 'active', NULL),

            (3, 'Project Documentation',
            '[
                {"type":"heading-one","children":[{"text":"Project Documentation"}]},
                {"type":"paragraph","children":[{"text":"Overview of the project, its goals, and how components fit together."}]}
            ]', 'published', NULL),

            (3, 'API Reference',
            '[
                {"type":"heading-one","children":[{"text":"API Reference"}]},
                {"type":"paragraph","children":[{"text":"Endpoint definitions, parameters, and example requests."}]},
                {"type":"code-block","children":[{"text":"GET /api/items\nPOST /api/items"}]}
            ]', 'draft', NULL),

            (4, 'Ideas for new features',
            '[
                {"type":"heading-one","children":[{"text":"Ideas for New Features"}]},
                {"type":"bulleted-list","children":[
                    {"type":"list-item","children":[{"text":"Dark mode toggle"}]},
                    {"type":"list-item","children":[{"text":"Keyboard shortcuts"}]},
                    {"type":"list-item","children":[{"text":"Offline sync"}]}
                ]}
            ]', NULL, NULL),

            (4, 'Meeting notes',
            '[
                {"type":"heading-one","children":[{"text":"Meeting Notes"}]},
                {"type":"paragraph","children":[{"text":"Date: TBD"}]},
                {"type":"bulleted-list","children":[
                    {"type":"list-item","children":[{"text":"Discussion point one"}]},
                    {"type":"list-item","children":[{"text":"Action item one"}]}
                ]}
            ]', NULL, NULL),

            (5, 'PostgreSQL Documentation',
            '[
                {"type":"heading-one","children":[{"text":"PostgreSQL Documentation"}]},
                {"type":"paragraph","children":[{"text":"Reference notes on schema design, queries, and administration."}]}
            ]', NULL, NULL),

            (5, 'React Router Guide',
            '[
                {"type":"heading-one","children":[{"text":"React Router Guide"}]},
                {"type":"paragraph","children":[{"text":"Notes on route configuration, loaders, and navigation patterns."}]}
            ]', NULL, NULL),

            (6, 'React Server Components',
            '[
                {"type":"heading-one","children":[{"text":"React Server Components"}]},
                {"type":"paragraph","children":[{"text":"Overview of server component rendering and data fetching patterns."}]}
            ]', NULL, NULL),

            (6, 'PostgreSQL Tutorial',
            '[
                {"type":"heading-one","children":[{"text":"PostgreSQL Tutorial"}]},
                {"type":"paragraph","children":[{"text":"Step-by-step introduction to querying and managing PostgreSQL databases."}]}
            ]', NULL, NULL),

            (7, 'Architecture Diagram',
            '[
                {"type":"heading-one","children":[{"text":"Architecture Diagram"}]},
                {"type":"paragraph","children":[{"text":"High-level system architecture overview and component relationships."}]}
            ]', NULL, NULL),

            (7, 'UI Mockup',
            '[
                {"type":"heading-one","children":[{"text":"UI Mockup"}]},
                {"type":"paragraph","children":[{"text":"Visual mockups for key screens and user flows."}]}
            ]', NULL, NULL);
        `,
    select: `
        SELECT
            i.id,
            i.title,
            i.content,
            p.name AS category,
            c.name AS subcategory
        FROM item i
        JOIN category c ON i.category_id = c.id
        LEFT JOIN category p ON c.parent_id = p.id
        WHERE p.name = 'task' OR c.name = 'task';
    `,
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
    addSimplr: `
        INSERT INTO category (name) VALUES ('Tasks'), ('Projects'), ('Knowledge');
        INSERT INTO item 
            (category_id, title, tree, status, scheduled) 
        VALUES 
            (1, 'First Task', '{}', NULL, NULL),
            (1, 'Second Task', '{}', NULL, NULL),
            (2, 'First Project', '{}', NULL, NULL),
            (3, 'First Knowledge Item', '{}', NULL, NULL);
    `,
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

