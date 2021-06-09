import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.png';

//container that wraps the navbar
class NavBarContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div id={this.props.navBarContainerId}><NavBarLogo logoId="logo"/><NavBarList childOne={<NavBarListElement text="home"/>}/></div>
  }
}

//logo element
class NavBarLogo extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <img src={logo} id={this.props.logoId}></img>
  }
}

// list of elements on the nav bar
class NavBarList extends React.Component {
  constructor(props){
    super(props);
    this.state = {hover : false}
  }
  onMouseOverEvent = () => {
    this.setState({hover : true});
    this.render();
  }
  onMouseOutEvent = () => {
    this.state.hover = false;
    console.log(`on mouse out ran and the hover is ${this.state.hover}`);
    this.render();

  }
  render(){
    console.log(`render ran and the hover is ${this.state.hover}`);
    return  <ul onMouseOver={this.onMouseOverEvent} onMouseOut={this.onMouseOutEvent}>
              <NavBarListElement text="Home" hover={this.state.hover}/><NavBarListElement text="About" hover={this.state.hover}/>
              <NavBarListElement text="Products" hover={this.state.hover}/><NavBarListElement text="Buy/Sell" hover={this.state.hover}/>
              <NavBarListElement text="News" hover={this.state.hover}/><NavBarListElement text="Contact" hover={this.state.hover}/>
            </ul>
  }
}

// list element in the nav bar list
class NavBarListElement extends React.Component{
  constructor(props){
    super(props);
    console.log(`this is list elements constructor and hover is ${this.props.hover}`);
    if(this.props.hover){
      this.state = {class : 'navBarListElementColor'}
    }else{
      this.state = {class : ''}
    }
  }
  /*static getDerivedStateFromProps(props, state){
    if(props.hover){
      return {class : "navBarListElementColor"}
    }
    else return
  }*/
  render(){
    return <li className={this.state.class}>{this.props.text}</li>
  }
}


ReactDOM.render(<NavBarContainer navBarContainerId="navBarContainer"/>, document.getElementById('root'));