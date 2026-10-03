import { useMemo, useRef } from 'react'
import { useLoaderData, useParams } from 'react-router'
import CollectionList from './CollectionList'
import CollectionItem from './CollectionItem'

export default function ()
{
    const urlParams = useParams()
    const data = useLoaderData()

    // The loader sorts by `edited`, so saving an item would reorder the list on
    // every revalidate. Freeze the order for the lifetime of this collection view
    // so items stay put while the user works; a full page load picks up the new order.
    const orderRef = useRef({ collection: null, ids: null })

    const orderedData = useMemo(() => {
        if (orderRef.current.collection !== urlParams.collection_name || !orderRef.current.ids) {
            orderRef.current = {
                collection: urlParams.collection_name,
                ids: data.map(item => item.id)
            }
            return data
        }

        const frozenIds = orderRef.current.ids
        const byId = new Map(data.map(item => [ item.id, item ]))

        const ordered = frozenIds
            .map(id => byId.get(id))
            .filter(Boolean)

        // Any items added since the order was frozen go on the end.
        const frozen = new Set(frozenIds)
        ordered.push(...data.filter(item => !frozen.has(item.id)))

        orderRef.current.ids = ordered.map(item => item.id)
        return ordered
    }, [ data, urlParams.collection_name ])

    const itemData = data.find(item => item.id === parseInt(urlParams.item_id))

    return(
        <>
            <div className="layout-list">

                <CollectionList data={ orderedData } />

            </div>

            <div className="layout-item">

                <CollectionItem 
                    key={ itemData?.id }  
                    data={ itemData }
                    urlParams={ urlParams }
                />

            </div>
        </>
    )
}
