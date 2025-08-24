import React from 'react'
import { Link } from 'react-router'


export const CalendarDay = ({ date, isActive, inCurrentWeek }) =>
{
    const dateStr = date.format()

    return (
        <Link 
            discover="none"
            to={ `/tasks?date=${dateStr}`}
            className= {`calendar__day${inCurrentWeek ? ' --current' : ''} ${isActive ? ' --active' : ''} c-flex-c-c`}
        >
            <time dateTime={ dateStr }>
                { date.getDay() }
            </time> 
        </Link>
    )
}
