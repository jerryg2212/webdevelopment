import './App.css';
import React from 'react';

class App extends React.Component{
  constructor(props){
    super(props);
    this.inputElement = null;
    this.state = {text: 'penis'}
    this.spanCallbackRef = (element) => {
      element.current.inner
    }
  }
  render(){
    return (
      <div>
        <input type="text"></input>
        <input  type="text"></input>
      </div>
    )
  }
  inputChange(ev){
    this.spanElement.current.textContent = ev.target.value;
  }
  componentDidMount(){

  }
}

export default App;
