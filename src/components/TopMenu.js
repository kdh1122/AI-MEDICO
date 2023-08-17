// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import React, { useContext } from 'react'
import { Icon, Image, Input, Menu, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import AppContext from '../context/AppContext'
import { Auth } from 'aws-amplify';

function TopMenu() {
    const {user, cart} = useContext(AppContext)
   
    function getAtt(name) {
        return user ? user[name] : ""
    }

    async function signOut() {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div style={divStyle}>
            <Menu fixed='top' stackable borderless inverted style={menuStyle}>
                <Menu.Item header>
                    <Link to='/'>
                        <Image src='/images/store-logo.svg' style={{ marginRight: '1.5em', marginLeft: '4em' }} />
                    </Link>
                </Menu.Item>
                <Menu.Menu>
                    <Menu.Item>
                        <Input icon={<Icon name='search' 
                                           link color='yellow' 
                                           bordered 
                                           inverted />} placeholder='Search...' 
                                                        style={{ width: '40em' }} />
                    </Menu.Item>
                </Menu.Menu>
                <Menu.Item position='right'>
                    <a href="#" onClick={signOut}>
                        {getAtt('given_name') + ' ' + getAtt('family_name')}
                    </a>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Link to={'/Checkout'}>
                        <Button
                            color='yellow'
                            icon='cart'
                            label={cart.items.length}
                            labelPosition='right'
                            style={cartStyle}
                        />
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default TopMenu

const menuStyle = {
	background: '#232f3e'
}

const divStyle = {
	paddingTop: '6em'
}

const cartStyle = {
    marginRight: '1em'
}