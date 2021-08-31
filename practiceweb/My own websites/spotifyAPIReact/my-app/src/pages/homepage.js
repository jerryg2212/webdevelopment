import React from 'react';
import '../styles/homepage.css';


class Homepage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h1>Login to your Spotify Account</h1>
                <a href="#">Login</a>
            </div>
        )
    }
}
export default Homepage