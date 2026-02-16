import { useState } from 'react'
import { useParams, useRouteLoaderData, useNavigate } from 'react-router'
import Editor from '../../../modules/editor/Editor'


function KnowledgeItemForm({ item, id, onNavigate })
{
	const initialValue = item?.component_tree
		? item.component_tree
		: [{ type: 'paragraph', children: [{ text: '' }] }]

	const [editorValue, setEditorValue] = useState(initialValue)
	const [title, setTitle] = useState(item?.title || '')

	const handleSave = async () => {
		const response = await fetch('/api/knowledge/save', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				itemId: item?.item_id || null,
				title: title,
				tree: editorValue
			})
		})

		const result = await response.json()

		// If creating new item, navigate to the new item's URL
		if (id === 'new' && result.itemId) {
			onNavigate(`/knowledge/${ result.itemId }`)
		}
	}

	return (
		<section className="layout-item">
			<div className="item-utils flex-r-e">
				<button className="button--" onClick={ handleSave }>Save</button>
			</div >

			<div className="s-flex-r">
				<div className="item__bullet">

				</div>
				<div className="item">

					<input
						className="item__title"
						type="text"
						name="title"
						placeholder="Title"
						value={ title }
						onChange={ (e) => setTitle(e.target.value) }
					/>
				

					<div className="editor-container">
						<Editor
							initialValue={ initialValue }
							onChange={ setEditorValue }
						/>
					</div>
				</div>
			</div>
		</section>
	)
}


export default function()
{
	const { id } = useParams()
	const items = useRouteLoaderData('Knowledge')
	const navigate = useNavigate()

	const item = id === 'new' ? null : items?.find(item => item.item_id === parseInt(id))

	return <KnowledgeItemForm key={ id } item={ item } id={ id } onNavigate={ navigate } />
}