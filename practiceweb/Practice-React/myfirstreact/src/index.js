import React from 'react';
import ReactDOM from 'react-dom';

const headerElm = <h1>fuck you</h1>;



class TestComponent extends React.Component {
  constructor(){
    super();
    this.state = {color: "red"}
  }
  render(){
    return <h2>this is an h2 element {this.props.shit}</h2>
  }
}


ReactDOM.render(<TestComponent shit="onMe"/>,document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
