import React from 'react';
import requestAuthentication from "./authenticationRequest.js";
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="home">
                <h1>this is the home section dslfk</h1>
            </div>
        )
    }
    componentDidMount(){
    }
}
export default Home;