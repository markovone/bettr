import { Outlet } from 'react-router'
import { Calendar } from '../../../ui/Calendar'

export default function()
{
    return (
        <section className="flex-1-r">
            <div className="lay-list">
                <header>
                    <div className="lay-toprow c-flex-r">
                        <h1>Tasks List</h1>
                    </div>

                    <Calendar />
                </header>
                
            </div>

            <Outlet/>
        </section>
    )
}