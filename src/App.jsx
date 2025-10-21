import React, { Component } from 'react';
import Card from './components/Card.jsx';

class App extends Component {
    render() {
        return (
            <div>
                <h2 style={{ textAlign: 'center', marginTop: 20 }}>My React Card Example</h2>
                <Card />
            </div>
        );
    }
}

export default App;