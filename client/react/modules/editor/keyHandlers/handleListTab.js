import { Transforms, Editor, Element, Range, Path, Node } from 'slate'


// Handles Tab key in list items to create nested lists
export const handleListTab = (editor, event) => {
	const { selection } = editor

	if (!selection || !Range.isCollapsed(selection)) {
		return false
	}

	// First find the list-item-content to ensure we get the immediate list-item
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

	// Check if there's a previous sibling list-item to nest under
	const previousSiblingPath = Path.previous(listItemPath)

	try {
		const previousSibling = Node.get(editor, previousSiblingPath)

		// Only proceed if the previous sibling is also a list-item
		if (!Element.isElement(previousSibling) || previousSibling.type !== 'list-item') {
			return false
		}

		event.preventDefault()

		// Get the parent list type (bulleted-list, etc.)
		const [parentListMatch] = Editor.nodes(editor, {
			at: listItemPath,
			match: n => Element.isElement(n) && (n.type === 'bulleted-list'),
		})

		if (!parentListMatch) {
			return false
		}

		const listType = parentListMatch[0].type

		// Check if previous sibling already has a nested list as its last child
		const previousSiblingChildren = previousSibling.children
		const lastChild = previousSiblingChildren[previousSiblingChildren.length - 1]

		let hasNestedList = Element.isElement(lastChild) && lastChild.type === listType

		if (hasNestedList) {
			// Move current list-item into the existing nested list
			const nestedListPath = [...previousSiblingPath, previousSiblingChildren.length - 1]

			Transforms.moveNodes(editor, {
				at: listItemPath,
				to: [...nestedListPath, lastChild.children.length],
			})
		} else {
			// Create a new nested list inside the previous sibling
			// First, move the current list-item
			const tempPath = Path.next(previousSiblingPath)

			if (!Path.equals(listItemPath, tempPath)) {
				Transforms.moveNodes(editor, {
					at: listItemPath,
					to: tempPath,
				})
			}

			// Wrap it in a new list
			const nestedList = { type: listType, children: [] }
			Transforms.wrapNodes(editor, nestedList, {
				at: tempPath,
			})

			// Move the nested list inside the previous sibling
			const wrappedPath = tempPath
			Transforms.moveNodes(editor, {
				at: wrappedPath,
				to: [...previousSiblingPath, previousSiblingChildren.length],
			})
		}

		return true
	} catch (error) {
		// No previous sibling exists (first item in list)
		return false
	}
}
