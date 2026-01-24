import Paragraph from './components/Paragraph'
import Bold from './components/Bold'
import Italic from './components/Italic'
import Underline from './components/Underline'
import CodeBlock from './components/CodeBlock'
import Link from './components/Link'
import Heading from './components/Heading'
import BulletedList from './components/BulletedList'
import ListItem from './components/ListItem'
import ListItemContent from './components/ListItemContent'


export const renderElement = (props) => {
    switch (props.element.type) {
        case 'link':
            return <Link {...props} />
        case 'paragraph':
            return <Paragraph {...props} />
        case 'code-block':
            return <CodeBlock {...props} />
        case 'heading-1':
        case 'heading-2':
        case 'heading-3':
        case 'heading-4':
        case 'heading-5':
        case 'heading-6':
            return <Heading {...props} />
        case 'bulleted-list':
            return <BulletedList {...props} />
        case 'list-item':
            return <ListItem {...props} />
        case 'list-item-content':
            return <ListItemContent {...props} />
        default:
            return <Paragraph {...props} />
    }
}

export const renderLeaf = (props) => {
    let { attributes, children, leaf } = props

    if (leaf.bold) {
        children = <Bold>{children}</Bold>
    }

    if (leaf.italic) {
        children = <Italic>{children}</Italic>
    }

    if (leaf.underline) {
        children = <Underline>{children}</Underline>
    }

    return <span {...attributes}>{children}</span>
}
