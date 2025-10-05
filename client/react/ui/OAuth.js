import { NavLink } from 'react-router'
import cookie from '../../utils/cookie'


export function OAuth()
{
    const params = {
        client_id: '220126151030-crt869i67dirav7amc8buqjfci9vhuh1.apps.googleusercontent.com',
        redirect_uri: 'https://bttr.cz/auth/oauth2callback',
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/youtube.force-ssl',
        include_granted_scopes: 'true',
        state: `${window.location.href}`,
        access_type: 'offline',
        prompt: 'consent'
    }

    const searchParams = new URLSearchParams(params)

    async function getLikedVideos() {
        const params = new URLSearchParams({
            myRating: 'like',
            part: 'snippet',
            maxResults: 100,
            pageToken: 'CDIQAA',
            mine: 'true'
        })

        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`,
            {
                headers: {
                    'Authorization': `Bearer ${cookie.get('access_token')}`,
                    'Accept': 'application/json'
                }
            }
        )
        
        const data = await response.json()

        return data.items
    }

    console.log(Object.fromEntries(searchParams))

    return (
        <div>
            <a href={ `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}` }>
                Youtube OAuth Link
            </a>
            <br />
            <button onClick={ () => { getLikedVideos() }}>
                Get liked videos
            </button>
        </div>
    )
}