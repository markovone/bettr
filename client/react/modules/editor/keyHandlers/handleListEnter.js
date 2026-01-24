import { Transforms, Editor, Element, Range, Path } from 'slate'


/**
 * Handles Enter key in list items to create new list items
 */
export const handleListEnter = (editor, event) => {
	const { selection } = editor

	if (!selection || !Range.isCollapsed(selection)) {
		return false
	}

	// Check if cursor is inside a list-item-content node
	const [listItemContentMatch] = Editor.nodes(editor, {
		match: n => Element.isElement(n) && n.type === 'list-item-content',
	})

	if (!listItemContentMatch) {
		return false
	}

	const [listItemContentNode, listItemContentPath] = listItemContentMatch

	// Get the immediate parent list-item (not a higher ancestor)
	// We do this by checking the parent path
	const listItemPath = Path.parent(listItemContentPath)
	const listItemNode = Editor.node(editor, listItemPath)

	if (!listItemNode || !Element.isElement(listItemNode[0]) || listItemNode[0].type !== 'list-item') {
		return false
	}

	event.preventDefault()

	// Split at the specific list-item path
	// This ensures we only split the immediate list-item, not a parent one
	Transforms.splitNodes(editor, {
		at: selection,
		match: (n, path) => Path.equals(path, listItemPath),
		always: true,
	})

	return true
}
