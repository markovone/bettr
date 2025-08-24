
export function Icon({ fragment, size })
{
    return (
        <div className={ 'icon' + (size ? '-' + size : '')}>
            <svg>
                <title>{ fragment }</title>
                <use href={ `/img/icons-main.svg?12#${fragment}` }></use>
            </svg>
        </div>
    )
}