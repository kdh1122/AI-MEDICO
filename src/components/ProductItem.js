// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React from 'react'
import { Grid, Image, Container, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import styled from 'styled-components'

function ProductItem(props) {
    var stars
    var totalChits = 0
    var i

    for (i = 0; i < 5; i++) {
        if (i <= (props.item.stars - 1)) {
            stars = [stars, <Icon color='yellow' name='star' key={Math.random()}/>]
            totalChits++
        }
    }

    if (!Number.isInteger(props.item.stars)) {
        stars = [stars, <Icon color='yellow' name='star half' key={Math.random()}/>]
        totalChits++
    }

    for (i = 0; i < (5 - totalChits); i++) {
        stars = [stars, <Icon color='yellow' name='star outline' key={Math.random()}/>]
    }

    return (
        <Grid.Column>
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Link to={'/Product/' + props.item.id}>
                            <Image src={props.item.image} centered/>
                        </Link>
                        <Container style={{ paddingLeft: '2em' }}>
                            <LinkStyle><Link to={'/Product/' + props.item.id}>{props.item.name}</Link></LinkStyle>
                            <StoreText>Amazon</StoreText>
                            {stars}
                            <Grid columns={2}>
                                <Grid.Column width={3}><PriceText>${props.item.price}</PriceText></Grid.Column>
                                <Grid.Column verticalAlign='bottom'><img src='/images/misc/prime.png' alt='prime'/></Grid.Column>
                            </Grid>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Grid.Column>
    )
}

export default ProductItem

const LinkStyle = styled.div`
    font-size: 1em;
`;

const StoreText = styled.div`
    font-size: 9pt;
    padding-top: 1em;
`;

const PriceText = styled.div`
    font-size: 10pt;
    padding-top: 1em;
    color: #B12704;
`;