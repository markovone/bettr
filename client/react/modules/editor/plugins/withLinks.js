export const withLinks = (editor) => {
	const { isInline } = editor

	editor.isInline = (element) => {
		return element.type === 'link' ? true : isInline(element)
	}

	return editor
}
