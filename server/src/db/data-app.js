export const collection = ({
    date = 'NOw',
    types = [], 
    tags = [],
} = {}) => {
    return {
        date, types, tags,
    }
}

export const collections = {
    '': {
        types: ['all'] 
    },
	'tasks': { 
        label: 'tasks',
        types: ['tasks'],
        date: [ 'today', 'today' ],
    },
	'projects': { 
        label: 'projects',
        types: ['projects'] 
    },
	'knowledge': { 
        label: 'knowledge',
        types: ['document', 'note', 'link', 'video', 'image'],
        tags: ['all'],
    },
    'health': { 
        label: 'health',
        types: ['document', 'note', 'link', 'video', 'image'],
        tags: ['health'] 
    },
    'money': { 
        label: 'money',
        types: ['document', 'note', 'link', 'video', 'image'],
        tags: ['money'] 
    },
}