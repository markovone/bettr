import { Outlet } from 'react-router'
import Header from '../../ui/Header'

export default function ()
{

    return(
        <>
            <Header />
            <Outlet />
        </>
    )
}