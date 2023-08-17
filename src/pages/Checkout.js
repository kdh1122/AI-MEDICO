// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, {useState, useEffect, useContext} from 'react'
import { Grid } from 'semantic-ui-react'

import AppContext from '../context/AppContext'

import InitState from './InitState'
import CheckoutBanner from '../components/CheckoutBanner'
import CheckoutSummary from '../components/CheckoutSummary'
import CheckoutPayment from '../components/CheckoutPayment'

// var product_data = require('../products.json');
// const uuidv4 = require('uuid/v4');

function Checkout(props) {
    const [ordering, setOrdering] = useState(false)
    const [card, setCard] = useState(0)
    const [totalPurchase, setTotal] = useState(0)
    const [orderComplete, setOrderComplete] = useState(false)

    var {user, cart, items, clearCart} = useContext(AppContext)

    const quantText = (cart.items.length === 1) ? '1 item' : cart.items.length + ' items'

    function handleCardUpdate(e) {
        setCard(e.value)
    }

    function submitOrder() {
        setOrderComplete(true)
    }

    useEffect(() => {
        function calculateTotal() {
            var total = 0
            var _item = null
    
            cart.items.map((item) => {
                var _product = items.filter(function (el) {
                    return el.id === item.id
                })
    
                _product.length === 1 ? _item = _product[0] : _item = null
                total += (_item.price * item.quantity)
                return null
            })
    
            setTotal(parseFloat(total).toFixed(2))
            return parseFloat(total).toFixed(2)
        }

        calculateTotal()
    }, [cart.items, items])

    useEffect(() => {
        if (orderComplete) {

            // Analytics.updateEndpoint



            console.log("Purchase price", totalPurchase)

            var _mTotal = parseFloat(totalPurchase).toFixed(2)
        
            // Analytics.record



            clearCart()

            props.history.push('ordercomplete')
        }
    }, [orderComplete, props.history, clearCart, totalPurchase]);

    return (
        <div>
            <InitState/>
            <CheckoutBanner quantity={quantText}/>
            <div style={mainDiv}>
                <Grid columns={2}>
                    <Grid.Row>
                    <Grid.Column floated='left' width={11}>
                        <CheckoutSummary placedOrder={ordering} 
                                         onCardUpdate={handleCardUpdate} 
                                         onOrder={submitOrder}
                                         user={user}
                                         cart={cart}
                                         total={totalPurchase}
                                         />
                    </Grid.Column>
                    <Grid.Column floated='right' width={5}>
                        <CheckoutPayment placedOrder={ordering} 
                                         onOrder={submitOrder}
                                         user={user}
                                         cart={cart}
                                         total={totalPurchase}
                                         />
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

export default Checkout

const mainDiv = {
    marginLeft: '5em',
    marginRight: '1em',
    marginTop: '2em'
}