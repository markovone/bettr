import { NavLink } from 'react-router'


export default function()
{
    return (
        <header>
            <div className="logo">
                BTTR
            </div>

            <nav className="">
                <ul>
                    <li>
                        <NavLink to="/tasks">Tasks</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/knowledge">Knowledge</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}