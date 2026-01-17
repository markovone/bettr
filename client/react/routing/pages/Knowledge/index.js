import { Outlet } from 'react-router'
import Editor from '../../../modules/editor/Editor'

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
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
