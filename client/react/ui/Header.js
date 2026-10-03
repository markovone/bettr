import { NavLink } from 'react-router'
import { Icon } from './Icon'
import { categories } from '../routing/routes'


export default function()
{
    return (
        <div className="layout-header e-flex-c">
            <header className="logo layout-toprow c-flex-r-e">
                <NavLink to="/" >
                    BTTR    
                </NavLink>
            </header>

            <div className="toolbar__main c-flex-r-e">
                <Icon fragment="search" size={ 16 } />
            </div>

            <nav className="nav-main">
                <ul>

                    {
                        categories.map((item) => (
                            <li key={ item }>
                                <NavLink to={ `/${item}` }>{ item }</NavLink>
                            </li>
                        ))
                    }

                </ul>
            </nav>
        </div>
    )
}