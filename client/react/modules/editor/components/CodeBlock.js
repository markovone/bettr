export default function CodeBlock({ attributes, children }) {
    return (
        <pre {...attributes}>
            <code>{children}</code>
        </pre>
    )
}
