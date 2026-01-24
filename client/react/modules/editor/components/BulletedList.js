export default function BulletedList({ attributes, children }) {
	return (
		<ul {...attributes}>
			{children}
		</ul>
	)
}
