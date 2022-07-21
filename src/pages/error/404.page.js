import React from 'react'
import TabTitle from '../../utils/TabTitle.util'
import { WebsiteName } from '../../utils/WebsiteName.util'

const Page404 = () => {
    TabTitle({ newTitle: WebsiteName + ' - Page not found' })
    return (
        <div> 404.page</div>
    )
}

export default Page404