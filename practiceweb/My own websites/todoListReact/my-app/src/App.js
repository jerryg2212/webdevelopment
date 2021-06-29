import React from "react";
import { render } from "react-dom";
import Home from "./pages/home.js";
import Login from "./pages/login.js";
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
          <Route path="/login"><Login></Login></Route>
          <Route path="/"><Home></Home></Route>
        </Switch>
      </Router>
    )
  }
  componentDidMount(){
   
    console.log("the component mounted");
  }
}
export default App;
