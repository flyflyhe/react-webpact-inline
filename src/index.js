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
console.log("基础路由");
console.log(process.env.NODE_ENV);
console.log(process.env.REACT_APP_BASE_URI);
const Index = () => {
    return <div>Hello React!</div>;
};

ReactDOM.render(<App/>, document.getElementById('root'));