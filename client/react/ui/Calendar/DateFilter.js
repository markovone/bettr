import { useState } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router'
import { matchRoute } from '../../../utils'
import utc from '../../../utils/utc'

export const DateFilter = () =>
{
    const { date: dateStr = utc().getDateString() } = useParams()

    const dateArr = dateStr.split('-')
    const [ state, setState ] = useState(
        {
            'date': dateArr[2],
            'month': dateArr[1],
            'year': dateArr[0]
        }
    )
    const navigate = useNavigate()

    const onChange = (e) => {
        // TODO date overflow

        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            const date = `${state.year}-${state.month.padStart(2, '0')}-${state.date.padStart(2, '0')}`
            const path = generatePath(matchRoute().path, { date })

            navigate(path)
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
