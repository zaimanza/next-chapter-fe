import React from 'react'
import TabTitle from '../../utils/TabTitle.util'
import { WebsiteName } from '../../utils/WebsiteName.util'

const Page500 = () => {
    TabTitle({ newTitle: WebsiteName + ' - Website Not Available' })
    return (
        <div>500 page server error</div>
    )
}

export default Page500