import { useState } from 'react'
import { useSearchParams } from 'react-router'

export const DateFilter = ({ dateStr }) =>
{
    const [ searchParams, setSearchParams ] = useSearchParams()

    const dateArr = dateStr.split('-')
    const [ state, setState ] = useState(
        {
            'date': dateArr[2],
            'month': dateArr[1],
            'year': dateArr[0]
        }
    ) 

    const onChange = (e) => {
        // TODO date overflow

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            const d = `${state.year}-${state.month.padStart(2, '0')}-${state.date.padStart(2, '0')}`

            setSearchParams({ date:d })
        }
    }


    
    return (
        <div className="calendar__date-filter c-flex-r">
                
            { Object.keys(state).map(
                (key) => (
                    <input
                        key={ key }
                        type="text" 
                        name={ key }
                        value={ parseInt(state[key])}
                        onChange={ onChange }
                        onKeyDown={ onEnter }
                    /> 
                )
            )}

        </div>
    )
}
