import { useMemo, useCallback } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { renderElement, renderLeaf } from './renderers'
import Toolbar from './components/Toolbar'
import { withLinks } from './plugins/withLinks'



export default function Editor({ initialValue }) {
    const editor = useMemo(() => withLinks(withReact(createEditor())), [])

    return (
        <Slate editor={ editor } initialValue={ initialValue }>
            <Toolbar />
            <Editable
                renderElement={ renderElement }
                renderLeaf={ renderLeaf }
                placeholder="Start typing..."
            />
        </Slate>
    )
}
