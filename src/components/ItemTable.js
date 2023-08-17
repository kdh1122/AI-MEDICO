// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useContext } from 'react'
import { Grid } from 'semantic-ui-react'

import ProductItem from './ProductItem'
import AppContext from '../context/AppContext'

function ItemTable(props) {
    const {items} = useContext(AppContext)
    var typeFilter = props.type

    const productItems = items.map((item) => {
        if (item.type === typeFilter) {
            return <ProductItem item={item} key={item.name}/>
        } else {
            return null
        }
    })

    return (
        <Grid stackable divided columns={4}>
            {productItems}
        </Grid>
    )
}

export default ItemTable