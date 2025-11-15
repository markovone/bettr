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
            <div className="lay-list">
                <header>
                    <div className="lay-toprow c-flex-r">
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
                                key={ task.status }
                                className="list__item"
                            >
                                <button className={`list__bullet button--${task.status}`}>
                                    { task.status === 'done' ? <Icon fragment="check" size="70" /> : null }
                                </button>

                                <NavLink 
                                    className="list__item__title"
                                    to={ `/tasks/${dateStr}/${task.id}` }
                                >
                                    { task.title }
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