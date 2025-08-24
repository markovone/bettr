import { useState } from 'react'
import { useSearchParams } from 'react-router'

export const DateFilter = ({ dateSelected }) =>
{
    // const [ searchParams, setSearchParams ] = useSearchParams()
    // const [ state, setState ] = useState(
    //     searchParams.get('date')?.split('-')
    // )

    const keys = [ 'date', 'month', 'year' ]

    console.log(dateSelected.toDateArray().reverse())

    return (
        <div className="calendar__date-filter c-flex-r">
                
            { dateSelected.toDateArray().reverse().map(
                (datePart, i) => (
                    <input
                        key={ keys[i] }
                        type="text" 
                        name={ keys[i] }
                        value={ datePart }
                    /> 
                )
            )}

        </div>
    )
}
