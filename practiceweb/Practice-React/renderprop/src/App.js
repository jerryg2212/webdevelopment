import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <GreenBackgroundColor fuckYeah={() => (
        <p style={{width: '30px', background: 'blue'}}>shit me this should be green</p>
      )}></GreenBackgroundColor>
    </div>
  );
}

class GreenBackgroundColor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      backgroundColor: 'green'
    }
  }
  render(){
    return(
      <div style={{background : this.state.backgroundColor}}>
        {this.props.fuckYeah()}
      </div>
    )
  }
}


export default App;
