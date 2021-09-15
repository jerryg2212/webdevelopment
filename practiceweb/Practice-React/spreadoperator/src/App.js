import './App.css';
import React from 'react'

function App() {
  return (
    <div className="App">
      <Penis name="Jerry Gensiejewski" hobbie="basketball" favoriteMovie="The Departed"/>
    </div>
  );
}

class Penis extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {name, ...other} = this.props;
    return (
      <Tester {...other}/>
    )
  }
}
class Tester extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return (
      <p> shit</p>
    )
  }
}

export default App;
