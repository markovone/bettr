import { useMemo, useCallback, useEffect } from 'react'
import { createEditor, Editor as SlateEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { renderElement, renderLeaf } from './renderers'
import Toolbar from './components/Toolbar'
import { withLinks } from './plugins/withLinks'
import { withLists } from './plugins/withLists'
import { handleKeyDown as handleEditorKeyDown } from './keyHandlers'



export default function Editor({ initialValue }) {
	const editor = useMemo(() => withLists(withLinks(withReact(createEditor()))), [])


	const handleKeyDown = useCallback((event) => {
		handleEditorKeyDown(editor, event)
	}, [editor])

	return (
		<Slate editor={ editor } initialValue={ initialValue }>
			<Toolbar />
			<Editable
				renderElement={ renderElement }
				renderLeaf={ renderLeaf }
				placeholder="Start typing..."
				onKeyDown={ handleKeyDown }
			/>
		</Slate>
	)
}
