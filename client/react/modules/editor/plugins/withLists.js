import { Editor, Element, Node, Transforms } from 'slate'

export const withLists = (editor) => {
	const { normalizeNode } = editor

	editor.normalizeNode = ([node, path]) => {
		if (Element.isElement(node) && node.type === 'list-item') {
			// Check if we have a list-item-content as first child
			const firstChild = node.children[0]
			const hasContentWrapper = firstChild && Element.isElement(firstChild) && firstChild.type === 'list-item-content'

			if (!hasContentWrapper) {
				// Case 1: No content wrapper exists
				// We need to find all leading text nodes and inline elements to wrap them
				const childrenToWrap = []
				let foundBlockElement = false

				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i]

					if (Element.isElement(child)) {
						// Check if this is a block element
						if (Editor.isBlock(editor, child)) {
							foundBlockElement = true
							break
						} else {
							// Inline element (like link)
							childrenToWrap.push(i)
						}
					} else {
						// Text node
						childrenToWrap.push(i)
					}
				}

				if (childrenToWrap.length > 0) {
					// Wrap the leading text/inline elements
					Transforms.wrapNodes(
						editor,
						{ type: 'list-item-content', children: [] },
						{
							at: path,
							match: (n, p) => {
								// Match only the children at the indices we identified
								return p.length === path.length + 1 && childrenToWrap.includes(p[p.length - 1])
							}
						}
					)
					return
				}
			}
		}

		if (Element.isElement(node) && node.type === 'list-item-content') {
			// Ensure the first child is a paragraph (or block element)
			const firstChild = node.children[0]
			const hasParagraph = firstChild && Element.isElement(firstChild) && Editor.isBlock(editor, firstChild)

			if (!hasParagraph) {
				// Wrap the first set of text/inline elements in a paragraph
				const childrenToWrap = []

				for (let i = 0; i < node.children.length; i++) {
					const child = node.children[i]

					if (Element.isElement(child)) {
						// Check if this is a block element
						if (Editor.isBlock(editor, child)) {
							break
						} else {
							// Inline element (like link)
							childrenToWrap.push(i)
						}
					} else {
						// Text node
						childrenToWrap.push(i)
					}
				}

				if (childrenToWrap.length > 0) {
					// Wrap the leading text/inline elements in a paragraph
					Transforms.wrapNodes(
						editor,
						{ type: 'paragraph', children: [] },
						{
							at: path,
							match: (n, p) => {
								// Match only the children at the indices we identified
								return p.length === path.length + 1 && childrenToWrap.includes(p[p.length - 1])
							}
						}
					)
					return
				} else if (node.children.length > 0) {
					// If all children are block elements, insert an empty paragraph at the beginning
					Transforms.insertNodes(
						editor,
						{ type: 'paragraph', children: [{ text: '' }] },
						{ at: [...path, 0] }
					)
					return
				}
			}
		}

		// Fall through to default normalization
		normalizeNode([node, path])
	}

	return editor
}
