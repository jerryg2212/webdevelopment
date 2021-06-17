import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.png';

//container that wraps the navbar
class NavBarContainer extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return <div id={this.props.navBarContainerId}><NavBarLogo logoId="logo"/><NavBarList id="navBarList"/></div>
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
    this.state = {
      elms : [{text : "Home", hover : false}, {text : "About", hover : false}, {text : "Products", hover : false},
              {text : "Buy/Sell", hover : false}, {text : "News", hover : false}, {text : "Contact", hover : false}]
    }
  }
  onMouseOverEvent = (e) => {
    //console.log(e.target);
    let ul = Array.from(document.getElementById('navBarList').childNodes);
    let allElms = this.state.elms;
    for(let elm of allElms){
      (allElms.indexOf(elm) === ul.indexOf(e.target)) ? elm.hover = false : elm.hover = true;
    }

    //if(ul.includes(e.target)){    allElms[ul.indexOf(e.target)].hover = true;}
    this.setState({elm : allElms});
  }
  onMouseOutEvent = () => {
    console.log("on mouse out ran");
    this.setState({elms : [{text : "Home", hover : false}, {text : "About", hover : false}, {text : "Products", hover : false},
    {text : "Buy/Sell", hover : false}, {text : "News", hover : false}, {text : "Contact", hover : false}]});
  }
  render(){
    let lis = [];
    for (let i = 0; i < this.state.elms.length; i++){
      lis.push(<NavBarListElement text={this.state.elms[i].text} hover={this.state.elms[i].hover}/>);
    }
    return React.createElement("ul", {onMouseOver : this.onMouseOverEvent, onMouseOut : this.onMouseOutEvent, id : this.props.id}, ...lis);

    {/*return  (<ul onMouseOver={this.onMouseOverEvent} onMouseOut={this.onMouseOutEvent} id={this.props.id}>
              <NavBarListElement text="Home" hover={this.state.hover}/><NavBarListElement text="About" hover={this.state.hover}/>
              <NavBarListElement text="Products" hover={this.state.hover}/><NavBarListElement text="Buy/Sell" hover={this.state.hover}/>
              <NavBarListElement text="News" hover={this.state.hover}/><NavBarListElement text="Contact" hover={this.state.hover}/>
    </ul>)*/}
  }
}

// list element in the nav bar list
class NavBarListElement extends React.Component{
  constructor(props){
    super(props);
    console.log('li rerenders');
    if(this.props.hover){
      this.state = {class : 'navBarListElementColor'}
    }else{
      this.state = {class : ''}
    }
  }
  static getDerivedStateFromProps(props, state){
    if(props.hover){
      return {class : "navBarListElementColor"}
    }
    else return {class : ''}
  }
  render(){
    return <li className={this.state.class}>{this.props.text}</li>
  }
}


ReactDOM.render(<NavBarContainer navBarContainerId="navBarContainer"/>, document.getElementById('root'));