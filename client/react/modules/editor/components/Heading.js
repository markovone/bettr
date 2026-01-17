export default function Heading({ attributes, children, element }) {
	const level = element.type.split('-')[1]
	const Tag = `h${level}`

	return (
		<Tag {...attributes}>
			{children}
		</Tag>
	)
}
