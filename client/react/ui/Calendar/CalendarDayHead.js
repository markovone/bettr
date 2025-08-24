
export const CalendarDayHead = ({ date, isSameDayOfWeek }) =>
{

    return (
        <div className={ `calendar__day-head ${isSameDayOfWeek ? '--active' : ''}` }>
                
            <abbr>
                { date.format({ locale: 'cs-CZ', weekday: 'short' }) }
            </abbr>

        </div>
    )
}
