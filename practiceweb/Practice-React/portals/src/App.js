import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <ParentComponent />
    </div>
  );
}

class ParentComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div id="parentContainer">
        {ReactDOM.createPortal(<p id="paragraph">Hello</p>, document.body)}
      </div>
    )
  }
}

export default App;
