import { useParams, useRouteLoaderData } from "react-router"
import utc from "../../../../utils/utc"

export default function()
{
    const { 
        date: dateStr = utc().getDateString(),
        id
    } = useParams()

    const task = useRouteLoaderData('Tasks').find(item => item.id == id)


    return (
        <section className="lay-item flex-r">
            <header>
                <div className="lay-toprow c-flex-r">
                    <h2>{ task && task.title }</h2>
                </div>
            </header>
        </section>
    )
}