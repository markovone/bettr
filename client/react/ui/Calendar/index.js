import { useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import utc, { areInSameWeek, isSameDay, isSameDayOfWeek } from '../../../utils/utc'
import { arrayFromRange } from '../../../utils'
import { Icon } from '../Icon'
import { CalendarDayHead } from './CalendarDayHead'
import { CalendarDay } from './CalendarDay'
import { DateFilter } from './DateFilter'

export const Calendar = () =>
{
    const params = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()
    const calendarRef = useRef()
    const [ collapsed, setCollapsed ] = useState(true)

    const dateSelected = utc(searchParams.get('date') || utc().getDateString())
    const [ yearSelected, monthSelected ] = dateSelected.toArray()

    const firstOfMonth = utc([ yearSelected, monthSelected, 1 ])
    const lastOfMonth = utc([ yearSelected, monthSelected + 1, 0 ])

    const firstInGrid = 2 - (firstOfMonth.getDayOfWeek() || 7)
    const lastInGrid = lastOfMonth.getDay() + 7 - lastOfMonth.getDayOfWeek()

    const dates = arrayFromRange(firstInGrid, lastInGrid).map(
        day => utc([ yearSelected, monthSelected, day ])
    )


    const todayOfWeek = dateSelected.getDayOfWeek() || 7
    const firstOfWeek = dateSelected.getDay() - todayOfWeek + 1
    const lastOfWeek = dateSelected.getDay() - todayOfWeek + 7

    const currentWeek = arrayFromRange(firstOfWeek, lastOfWeek).map(
        day => utc([ yearSelected, monthSelected, day ])
    )

    return (
        <div className="calendar-wrapper e-flex-c">
            <div ref={ calendarRef } className={ `calendar ${collapsed ? 'collapsed' : ''}` }>

                { dates.slice(0, 7).map(d => 
                    <CalendarDayHead 
                        date={ d } 
                        key={ d.getTimestamp() + 1 } 
                        isSameDayOfWeek= {isSameDayOfWeek(dateSelected, d)}
                    />
                )}

                { dates.map(d => 
                    <CalendarDay 
                        date={ d } 
                        inCurrentWeek={ areInSameWeek(dateSelected, d) } 
                        isActive={ isSameDay(dateSelected, d) }
                        key={ d.getTimestamp() } 
                    />
                )}

            </div>

            <div className="e-flex-r-c">
                <DateFilter dateSelected={ dateSelected } />
                <button className="calendar__toggle" onClick={ () => setCollapsed(!collapsed) }>
                    <Icon fragment="arrow-down" />
                </button>
            </div>

        </div>
    )
}

