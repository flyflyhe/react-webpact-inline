import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './List.js';
import CreateFrom from './Form.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <CreateFrom />
                </div>
                <List />
            </div>
        );
    }
}

const Index = () => {
    return <div>Hello React!</div>;
};

ReactDOM.render(<App/>, document.getElementById('root'));