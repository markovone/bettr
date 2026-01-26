export default function ListItemContent({ attributes, children }) {
	return (
		<div {...attributes}>
			{children}
		</div>
	)
}
