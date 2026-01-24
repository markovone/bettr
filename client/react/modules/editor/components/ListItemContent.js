export default function ListItemContent({ attributes, children }) {
	return (
		<span {...attributes}>
			{children}
		</span>
	)
}
