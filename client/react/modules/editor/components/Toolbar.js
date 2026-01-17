import { useSlate } from 'slate-react'
import { toggleMark, isMarkActive, toggleBlock, isBlockActive, isLinkActive, wrapLink, unwrapLink } from '../utils'
import HeadingSelector from './HeadingSelector'

export default function Toolbar() {
    const editor = useSlate()

    const handleBoldClick = (event) => {
        event.preventDefault()
        toggleMark(editor, 'bold')
    }

    const handleItalicClick = (event) => {
        event.preventDefault()
        toggleMark(editor, 'italic')
    }

    const handleUnderlineClick = (event) => {
        event.preventDefault()
        toggleMark(editor, 'underline')
    }

    const handleCodeBlockClick = (event) => {
        event.preventDefault()
        toggleBlock(editor, 'code-block')
    }

    const handleLinkClick = (event) => {
        event.preventDefault()

        const { selection } = editor

        // Don't allow link creation with no text selected
        // if (selection && Range.isCollapsed(selection) && !isLinkActive(editor)) {
        //     return
        // }

        // If already in a link, unwrap it
        if (isLinkActive(editor)) {
            unwrapLink(editor)
            return
        }

        // Prompt for URL and wrap selection
        const url = window.prompt('Enter the URL:')

        if (url) {
            wrapLink(editor, url)
        }
    }


    const isBoldActive = isMarkActive(editor, 'bold')
    const isItalicActive = isMarkActive(editor, 'italic')
    const isUnderlineActive = isMarkActive(editor, 'underline')
    const isCodeBlockActive = isBlockActive(editor, 'code-block')
    const isLinkActiveState = isLinkActive(editor)

    return (
        <div className="editor-toolbar">
            <HeadingSelector />
            <button
                type="button"
                onMouseDown={handleBoldClick}
                className={`editor-toolbar__button ${isBoldActive ? 'editor-toolbar__button--active' : ''}`}
            >
                <b>B</b>
            </button>
            <button
                type="button"
                onMouseDown={handleItalicClick}
                className={`editor-toolbar__button ${isItalicActive ? 'editor-toolbar__button--active' : ''}`}
            >
                <i>I</i>
            </button>
            <button
                type="button"
                onMouseDown={handleUnderlineClick}
                className={`editor-toolbar__button ${isUnderlineActive ? 'editor-toolbar__button--active' : ''}`}
            >
                <u>U</u>
            </button>
            <button
                type="button"
                onMouseDown={handleCodeBlockClick}
                className={`editor-toolbar__button ${isCodeBlockActive ? 'editor-toolbar__button--active' : ''}`}
            >
                {'</>'}
            </button>
            <button
                type="button"
                onMouseDown={handleLinkClick}
                className={`editor-toolbar__button ${isLinkActiveState ? 'editor-toolbar__button--active' : ''}`}
            >
                🔗
            </button>
        </div>
    )
}
