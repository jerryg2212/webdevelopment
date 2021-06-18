import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Wrapper extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div id="Wrapper"></div>
    }
}

ReactDOM.render(<Wrapper></Wrapper>, document.getElementById('root'));