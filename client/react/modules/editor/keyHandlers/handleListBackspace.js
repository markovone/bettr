import { Transforms, Editor, Element, Range, Point, Path } from 'slate'


// Handles backspace at the start of a list item,
// converting it to a paragraph
export const handleListBackspace = (editor, event) => {
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

	// Get the immediate parent list-item
	const listItemPath = Path.parent(listItemContentPath)
	const listItemNode = Editor.node(editor, listItemPath)

	if (!listItemNode || !Element.isElement(listItemNode[0]) || listItemNode[0].type !== 'list-item') {
		return false
	}

	// Editor.start() returns the Point (location) at the start of a node at the given path
	const start = Editor.start(editor, listItemPath)

	// Point.equals() compares two Points to check if they reference the same location
	// If the cursor is at the start of the list item
	if (Point.equals(selection.anchor, start)) {
		event.preventDefault()

		// Step 1: Unwrap from the parent list
		// split: true preserves other items in separate list
		Transforms.unwrapNodes(editor, {
			match: n => Element.isElement(n) && (n.type === 'bulleted-list'),
			split: true,
		})

		// Step 2: Convert list-item to paragraph (keeping list-item-content inside for now)
		Transforms.setNodes(editor, {
			type: 'paragraph',
		}, {
			match: n => Element.isElement(n) && n.type === 'list-item',
		})

		// Step 3: Now unwrap list-item-content from within the paragraph
		Transforms.unwrapNodes(editor, {
			match: n => Element.isElement(n) && n.type === 'list-item-content',
		})

		return true
	}

	return false
}
