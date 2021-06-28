import React from "react";

 let allButtons = [
  {
    text: "fuck you",
    onClick :() => {console.log(`fuck you is clicked`)}
  },
  {
    text : "Shit me",
    onClick : () => {console.log(`shit me is clicked`)}
  },
  {
    text: "penis face",
    onClick : () => {console.log('you are a penis face');}
  }
]

let buttonBackground = React.createContext();

function App() {
  return (
    <buttonBackground.Provider value="Green">
      <div className="App">
      <ButtonContainer buttons={allButtons}></ButtonContainer>
      </div>
    </buttonBackground.Provider>

  );
}

class ButtonContainer extends React.Component{
  constructor(props){
    super(props);
    this.buttons = this.props.buttons.map((button) => {
      return <TestButton key={button.text} onClick={button.onClick} text={button.text}></TestButton>
    })
  }
  render(){
    return <div id="buttonContainer">
      {this.buttons}
    </div>
  }
}

class TestButton extends React.Component{
  constructor(props){
    super(props);
  }
  clickEvent(ev){
    this.props.onClick(ev);
    ev.target.style.backgroundColor = this.context;
    console.log(this.context);
  }
 // static contextType = buttonBackground;
  render(){
    return <button onClick={this.clickEvent.bind(this)}>{this.props.text}</button>
  }
}
TestButton.contextType = buttonBackground;

export default App;
