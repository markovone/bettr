import { NavLink } from 'react-router'

export default function ({ data })
{

    return(
        <div className="list">
            <ul>
                { data && data.map((item) => (
                    <li
                        key={ item.id }
                        className="list__item"
                    >
                        <NavLink
                            className="list__item__title"
                            to={ `/knowledge/${item.id}` }
                        >
                            { item.title || 'Untitled' }
                        </NavLink>
                    </li>
                )) }
            </ul>
        </div>
    )
}
