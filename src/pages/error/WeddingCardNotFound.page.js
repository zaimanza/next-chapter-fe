import React from 'react'
import TabTitle from '../../utils/TabTitle.util'
import { WebsiteName } from '../../utils/WebsiteName.util'

const WeddingCardNotFound = () => {
    TabTitle({ newTitle: WebsiteName + ' - Wedding card not found' })
    return (
        <div>WeddingCardNotFound.page</div>
    )
}

export default WeddingCardNotFound