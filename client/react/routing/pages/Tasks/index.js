import { NavLink, Outlet, useParams, useRouteLoaderData } from 'react-router'
import { Calendar } from '../../../ui/Calendar'
import utc from '../../../../utils/utc'
import { Icon } from '../../../ui/Icon'


export default function()
{
    const { date: dateStr = utc().getDateString() } = useParams()

    const data = useRouteLoaderData('Tasks')

    return (
        <section className="flex-1-r">
            <div className="layout-list">
                <header>
                    <div className="layout-toprow c-flex-r">
                        <h1>Schedule</h1>
                    </div>

                    <Calendar />
                </header>
                
                <div className="list">
                    <NavLink
                        className="list__item"
                        to={ `/tasks/${dateStr}/new` }
                    >
                        <button className="list__bullet button--new" disabled>
                            <Icon fragment="plus" />
                        </button>

                        <span className="list__item__title">
                            New Task
                        </span>  
                    </NavLink>

                    <ul>
                        { data.map((task) => (
                            <li 
                                key={ task.content[0].children }
                                className="list__item"
                            >
                                <button className={`list__bullet button--${task.state}`}>
                                    { task.state === 1 ? <Icon fragment="check" size="70" /> : null }
                                </button>

                                <NavLink 
                                    className="list__item__title"
                                    to={ `/tasks/${dateStr}/${task.id}` }
                                >
                                    { task.content[0].children }
                                </NavLink>
                            </li>
                        ))}

                    </ul>     
                </div>

            </div>

            <Outlet/>
        </section>
    )
}