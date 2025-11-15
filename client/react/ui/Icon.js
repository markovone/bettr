
export function Icon({ fragment, size = 50 })
{
    return (
        <div className={ 'icon' + '-' + size }>
            <svg>
                <title>{ fragment }</title>
                <use href={ `/img/icons-main.svg?13#${fragment}` }></use>
            </svg>
        </div>
    )
}