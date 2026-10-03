import { useState } from 'react'
import Editor from '../../modules/editor/Editor'
import { useSave } from '../actions'

export default function ({ urlParams, data })
{
    const initialValue = data?.tree
		? JSON.parse(data.tree)
		: [{ id: '0', type: 'paragraph', children: [{ text: '' }] }]


	const [ title, setTitle ] = useState(data?.title || '')
	const [ tree, setTree ] = useState(initialValue)

	const saveItem = useSave()

    return(
        <div className="flex-r">
            <div className="collection-item">
                <input
                    className="collection-item__title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={ title }
                    onChange={ (e) => setTitle(e.target.value) }
                />
            

                <div className="collection-item__body">
                    <Editor
                        placeholder="Type something"
                        initialValue={ initialValue }
                        onChange={ setTree }
                    />
                </div>
            </div>

            <div className="collection-item__toolbar">
                <button 
                    className="button--" 
                    onClick={ () => saveItem(`/api/collection/${urlParams.collection_name}/${urlParams.item_id}`, { id: data?.id, title, tree }) }>
                    Save
                </button>
            </div>
        </div>
    )
}