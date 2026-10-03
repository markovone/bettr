
export function Icon({ fragment, size = 8, style })
{
    return (
        <div className={  (style ? (style + '-') : '') + 'icon' + '-' + size}>
            <svg>
                <title>{ fragment }</title>
                <use href={ `/img/icons-main.svg?13#${fragment}` }></use>
            </svg>
        </div>
    )
}