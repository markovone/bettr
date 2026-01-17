import { useSlate } from 'slate-react'
import { getCurrentBlockType, setBlockType } from '../utils'

export default function HeadingSelector() {
	const editor = useSlate()
	const currentBlockType = getCurrentBlockType(editor)

	const handleChange = (event) => {
		event.preventDefault()
		const blockType = event.target.value
		setBlockType(editor, blockType)
	}

	return (
		<select
			value={currentBlockType}
			onChange={handleChange}
			className="editor-toolbar__select"
		>
			<option value="paragraph">Normal text</option>
			<option value="heading-1">Heading 1</option>
			<option value="heading-2">Heading 2</option>
			<option value="heading-3">Heading 3</option>
			<option value="heading-4">Heading 4</option>
			<option value="heading-5">Heading 5</option>
			<option value="heading-6">Heading 6</option>
		</select>
	)
}
