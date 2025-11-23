export default {
    addType:
        `INSERT INTO type (name)
            VALUES ('task');`,
    insertItem: 
        `INSERT INTO item (type_id, title, state)
            VALUES 
                (1, 'Pending task', 0),
                (1, 'This task is Done', 1),
                (1, 'Third task', 0);`,
}

