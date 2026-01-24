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
				// else if (foundBlockElement || node.children.length === 0) {
				// 	// Only block elements exist or empty list-item
				// 	// Insert an empty content wrapper at the start
				// 	Transforms.insertNodes(
				// 		editor,
				// 		{ type: 'list-item-content', children: [{ text: '' }] },
				// 		{ at: [...path, 0] }
				// 	)
				// 	return
				// }
			}
		}

		// Fall through to default normalization
		normalizeNode([node, path])
	}

	return editor
}
