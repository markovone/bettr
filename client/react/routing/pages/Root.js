import { Outlet, useLocation } from 'react-router'
import Header from '../../ui/Header'


import { matchRoute } from '../../../utils'

export default function ()
{
    const location = useLocation()
    const title = matchRoute(location.pathname).meta.title

    if (typeof document !== 'undefined') {
        document.title = title
    }

    return(
        <div className="content flex-r-c">
            <Header />

            <main className="flex-c">
                <Outlet />
            </main>
        </div>
    )
}