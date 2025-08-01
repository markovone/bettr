import { Outlet } from 'react-router'

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
                
            </div>

            <Outlet/>
        </section>
    )
}