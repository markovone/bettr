import { Outlet } from 'react-router'
import Editor from '../../../modules/editor/Editor'

const initialValue = [
	{
		type: 'heading-1',
		children: [{ text: 'Main Heading' }],
	},
	{
		type: 'paragraph',
		children: [
			{ text: 'This is a paragraph with a ' },
			{
				type: 'link',
				url: 'https://example.com',
				children: [{ text: 'link inside' }],
			},
			{ text: ' it.' },
		],
	},
	{
		type: 'bulleted-list',
		children: [
			{
				type: 'list-item',
				children: [
					{
						type: 'list-item-content',
						children: [
							{
								type: 'paragraph',
								children: [{ text: 'foo' }],
							},
							{
								type: 'paragraph',
								children: [{ text: 'container' }],
							},
						],
					},
				],
			},
			{
				type: 'list-item',
				children: [
					{
						type: 'list-item-content',
						children: [
							{
								type: 'paragraph',
								children: [{ text: 'bar' }],
							},
						],
					},
					{
						type: 'bulleted-list',
						children: [
							{
								type: 'list-item',
								children: [
									{
										type: 'list-item-content',
										children: [
											{
												type: 'paragraph',
												children: [{ text: 'bar.foo' }],
											},
										],
									},
								],
							},
							{
								type: 'list-item',
								children: [
									{
										type: 'list-item-content',
										children: [
											{
												type: 'paragraph',
												children: [{ text: 'bar.bar' }],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
]

export default function()
{
    return (
        <section className="flex-1-r">
            <div className="lay-list">
                <header>
                    <div className="lay-toprow c-flex-r">
                        <h1>Knowledge List</h1>
                    </div>
                </header>

                <Editor initialValue={initialValue} />
            </div>

            <Outlet/>
        </section>
    )
}
