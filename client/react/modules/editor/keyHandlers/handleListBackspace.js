import { Transforms, Editor, Element, Range, Path, Node } from 'slate'


/**
 * Handles Backspace key in list items to merge content with previous sibling
 * Moves the current list-item's content into the previous sibling's list-item-content
 */
export const handleListBackspace = (editor, event) => {
	const { selection } = editor

	// Validate selection exists and is collapsed
	if (!selection || !Range.isCollapsed(selection)) {
		return false
	}

	// Find the list-item-content ancestor
	const [listItemContentMatch] = Editor.nodes(editor, {
		match: n => Element.isElement(n) && n.type === 'list-item-content',
	})

	if (!listItemContentMatch) {
		return false
	}

	const [listItemContentNode, listItemContentPath] = listItemContentMatch

	// Get the parent list-item
	const listItemPath = Path.parent(listItemContentPath)
	const listItemNode = Editor.node(editor, listItemPath)

	// Validate the parent is a list-item
	if (!listItemNode || !Element.isElement(listItemNode[0]) || listItemNode[0].type !== 'list-item') {
		return false
	}

	// Check if cursor is at the very start of the list-item-content
	if (!Editor.isStart(editor, selection.anchor, listItemContentPath)) {
		return false
	}

	// Try to find the previous sibling list-item
	try {
		const previousSiblingPath = Path.previous(listItemPath)
		const previousSibling = Node.get(editor, previousSiblingPath)

		// Validate the previous sibling is a list-item
		if (!Element.isElement(previousSibling) || previousSibling.type !== 'list-item') {
			return false
		}

		// Get the previous sibling's list-item-content (should be first child)
		const prevListItemContent = previousSibling.children[0]

		if (!Element.isElement(prevListItemContent) || prevListItemContent.type !== 'list-item-content') {
			return false
		}

		const prevListItemContentPath = [...previousSiblingPath, 0]

		event.preventDefault()

		// Move all children from current list-item-content to previous list-item-content
		// Move in reverse order to avoid path shifting issues
		const currentContent = listItemContentNode.children
		for (let i = currentContent.length - 1; i >= 0; i--) {
			Transforms.moveNodes(editor, {
				at: [...listItemContentPath, i],
				to: [...prevListItemContentPath, prevListItemContent.children.length],
			})
		}

		// Remove the now-empty current list-item
		Transforms.removeNodes(editor, {
			at: listItemPath,
		})

		return true
	} catch (error) {
		// No previous sibling exists (first item in list)
		return false
	}
}
