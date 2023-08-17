import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import { withAuthenticator } from 'aws-amplify-react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import signUpConfig from './config/signUpConfig'

import InitState from './pages/InitState'
import TopMenu from './components/TopMenu'
import BottomMenu from './components/BottomMenu';
import Carousel from './components/Carousel'
import ItemTable from './components/ItemTable'

import './App.css'

class App extends React.Component {
    constructor(props, context) {
      super(props, context);
    }
  
    render() {
        if (this.props.authState == "signedIn") {
            return functionApp();
        } else {
            return null;
        }
    }
  }
  
function functionApp() {
    return (

        <div style={styles}>
            <InitState />
            <TopMenu />
            <BottomMenu />
            <AppContent />
        </div>
    );
}

function AppContent() {
    return (
        <>
            <Container text style={{ marginBottom: '1em' }}>
                <Header as='h1' style={{ textAlign: 'center' }}>All things Alexa</Header>
            </Container>
            <Container fluid>
                <Carousel />
            </Container>
            <Container style={{ marginTop: '2em' }}>
                <Header as='h2'>Smart displays</Header>
                <p>Everything you love about Alexa, and now she can show you things. Get the weather forecast, watch the news, and see lyrics with Amazon Music.</p>
            </Container>
            <Container style={{ marginTop: '2em' }}>
                <ItemTable type='echo' />
            </Container>
        </>
    );
}


export default withAuthenticator(App, { signUpConfig })

const styles = {
    marginLeft: '1em',
    marginRight: '1em'
}