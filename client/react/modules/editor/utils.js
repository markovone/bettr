import { Editor, Transforms, Element, Range, Path, Node, Point } from 'slate'

export const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

export const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

export const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format,
    })
    return !!match
}

export const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)

    Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : format },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
}

export const isLinkActive = (editor) => {
    const [link] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'link',
    })
    return !!link
}

export const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)

    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
}

export const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: n => Element.isElement(n) && n.type === 'link',
    })
}

export const getCurrentBlockType = (editor) => {
    const { selection } = editor

    if (!selection) return 'paragraph'

    const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n),
    })

    return match ? match[0].type : 'paragraph'
}

export const setBlockType = (editor, blockType) => {
    Transforms.setNodes(
        editor,
        { type: blockType },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    )
}

export const isListActive = (editor, format = 'bulleted-list') => {
    const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === format,
    })
    return !!match
}

export const toggleList = (editor, format = 'bulleted-list') => {
    const isActive = isListActive(editor, format)

    if (isActive) {
        // Unwrap the list
        // split: true allows partial unwrapping of selected items only
        Transforms.unwrapNodes(editor, {
            match: n => Element.isElement(n) && n.type === format,
            split: true,
        })

        // Unwrap list-item-content wrappers
        Transforms.unwrapNodes(editor, {
            match: n => Element.isElement(n) && n.type === 'list-item-content',
            split: true,
        })

        // Convert list items back to paragraphs
        Transforms.setNodes(
            editor,
            { type: 'paragraph' },
            { match: n => Element.isElement(n) && n.type === 'list-item' }
        )
    } else {
        // Convert current blocks to list items (only top-level blocks, not nested ones)
        Transforms.setNodes(
            editor,
            { type: 'list-item' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) && n.type !== 'list-item-content' }
        )
        // Wrap in list container
        const listNode = { type: format, children: [] }
        Transforms.wrapNodes(editor, listNode, {
            match: n => Element.isElement(n) && n.type === 'list-item',
        })
    }
}