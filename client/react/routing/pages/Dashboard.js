import { useState } from 'react'
import { useLoaderData } from 'react-router'


export default function()
{
    const [ data, setData ] = useState(useLoaderData())

    return (
        <section>
            <h1>Dashboard Component</h1>
            <ul>

                { data.map(item => (
                    <li key={ item.id }>
                        <h2>{ item.title }</h2>
                        <p>{ item.body }</p>
                    </li>
                ))}

            </ul>
        </section>
    )
}