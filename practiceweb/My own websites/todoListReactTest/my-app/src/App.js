import React from "react";
import { render } from "react-dom";
import Home from "./pages/home.js";
import LoginRegister from "./pages/loginRegister.js";
import CreateFirstList from "./pages/createFirstList.js";
import SpecificListPage from "./pages/specificListPage.js";
import "./styles/all.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    return (
      <Router>
        <Switch>
          <Route path="/register"><LoginRegister action="/register" link="/login" title="Register" linkTitle="Login"></LoginRegister></Route>
          <Route path="/login"><LoginRegister action="/login" link="/register" title="Login" linkTitle="Register" messages={messages}></LoginRegister></Route>
          <Route path="/createfirstlist"><CreateFirstList></CreateFirstList></Route>
          <Route path="/list"><SpecificListPage></SpecificListPage></Route>
          <Route exact path="/"><Home></Home></Route>
        </Switch>
      </Router>
    )
  }
  componentDidMount(){
    console.log('rerendered');
    /*let request = new XMLHttpRequest();
    request.onreadystatechange = () =>{
      if(request.readyState == 4){
        console.log('should be redirected');
      }
    }
    request.open("GET",'/authenticate', true);
    request.send();*/
    console.log("the component mounted");
  }
}
export default App;
