import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Amplify from 'aws-amplify'
//import * as serviceWorker from './serviceWorker';

import AppProvider from './context/AppProvider'

// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import App from './App';
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import PlacedOrder from './pages/PlacedOrder'
import Transcribe from './pages/Transcribe'
import Polly from './pages/Polly'
import Summary from './pages/Summary'

import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

const routing = (
    <AppProvider>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/product/:id" component={Product} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/ordercomplete" component={PlacedOrder}/>
                <Route path="/transcribe" component={Transcribe} />
                <Route path="/polly" component={Polly} />
                <Route path="/summary" component={Summary} />
                <Route component={App} />
            </Switch>
        </Router>
    </AppProvider>
)

ReactDOM.render(routing, document.getElementById('root'));

//serviceWorker.unregister();

