import React from 'react';
import InitState from './InitState'
import TopMenu from '../components/TopMenu'

function Reko(props) {
    return (
        <div style={styles}>
            <InitState/>
            <TopMenu />
            <h2>Reko Page</h2>
            <p>Here is the content of the Reko page.</p>
            <button onClick={() => props.history.push('/')}>Back to Main</button>
        </div>
    );
}

export default Reko;

const styles = {
    marginLeft: '1em',
    marginRight: '1em',
    marginTop: '2em'
}