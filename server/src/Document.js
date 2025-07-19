
export default function ({ title, app })
{
 
    return (
        <html>
            <head>
                <title>{ title }</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link href="/index.css" rel="stylesheet" />
                
                <script src="/index.js" defer></script>
            </head>
            <body>
                { app }
            </body>
        </html>
    )
}
