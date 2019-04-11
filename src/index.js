import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import './App.css';

class App extends Component{
    render() {
        return (
            <div>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="danger">Danger</Button>
            </div>
        );
    }
}

const Index = () => {
    return <div>Hello React!</div>;
};  

ReactDOM.render(<App />, document.getElementById('root'));