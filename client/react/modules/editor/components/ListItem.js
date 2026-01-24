export default function ListItem({ attributes, children }) {
	return (
		<li {...attributes}>
			{children}
		</li>
	)
}
