// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react'
import {Link} from 'react-router-dom'
import { Grid, Header, Image } from 'semantic-ui-react'
import styled from 'styled-components'

function CheckoutBanner(props) {
    return (
        <Grid columns={2} style={topBanner}>
            <Grid.Row>
                <Grid.Column width={2}>
                    <Link to='/'>
                        <Image src='/images/삼삼오오.gif' style={logoStyle} />
                    </Link>
                </Grid.Column>
                <Grid.Column width={12} verticalAlign='middle' textAlign='center' style={headerStyle}>
                    <Header as='h1' textAlign='center' style={{ color: 'white' }}>Patient Info. </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default CheckoutBanner

const topBanner = {
    background: '#000',
    //background: 'url(/images/header-bkg.png)',
    borderColor: '#DDD',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
    height: '73px'
}

const logoStyle = {
    marginRight: '1.5em', 
    marginLeft: '4em', 
    marginTop: '5px',
    marginBottom: '5px',
    maxWidth: '50%', // 이미지의 최대 너비
    maxHeight: '50%'
}

const headerStyle = {
    marginBottom: '30px',
    color: 'white',
}

const QuantityText = styled.a`
  font-size: 12pt;
  vertical-align: middle;
`