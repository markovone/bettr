export default function Link({ attributes, children, element }) {
	const handleMouseDown = (event) => {
	// Check for Ctrl+Click (Windows/Linux) or Cmd+Click (Mac)
	if (event.ctrlKey || event.metaKey) {
		event.preventDefault()
		window.open(element.url, '_blank', 'noopener,noreferrer')
	}
	// Normal clicks fall through to default contentEditable behavior (place cursor)
	}

	return (
	<a
		{...attributes}
		href={element.url}
		onMouseDown={handleMouseDown}
		className="editor-link"
		title={`${element.url} (Ctrl+Click to open)`}
	>
		{children}
	</a>
	)
}
