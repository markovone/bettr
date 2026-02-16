import { useParams, useRouteLoaderData } from "react-router"
import utc from "../../../../utils/utc"
import { useState } from "react"

export default function()
{
    const { 
        date: dateStr = utc().getDateString(),
        id
    } = useParams()

    const task = useRouteLoaderData('Tasks').find(item => item.id == id)

    const [ content, setContent ] = useState(task ? task.content : [])   
    
    console.log(content)


    return (
        <section className="layout-item flex-r">
            <header>
                <div className="layout-toprow c-flex-r">
                    

                </div>
            </header>
        </section>
    )
}