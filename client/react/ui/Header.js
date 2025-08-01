import { NavLink } from 'react-router'


export default function()
{
    return (
        <div className="lay-header">
            <header className="logo lay-toprow c-flex-r-e">
                BTTR
            </header>

            <nav className="nav-main">
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
        </div>
    )
}