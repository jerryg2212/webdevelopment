import React from 'react';
import '../styles/loginRegister.css';
import checkAuthenticated from './authenticationRequest.js';
import getData from './databaseRequests.js';
class LoginRegister extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="loginRegisterBody">
                <h1>{this.props.title}</h1>
                <form action={this.props.action} method="POST">
                    <span id="validationErrorBox"></span>
                    <label id="emailLabel" for="emailInput">Email</label>
                    <input type="email" name="email" className="textInput"></input>
                    <label id="passwordLabel" for="passwordInput">Password</label>
                    <input type="password" name="password" className="textInput"></input>
                    <button type="submit" className="submitButton">Login</button>
                    <a href={this.props.link}>{this.props.linkTitle}</a>
                </form>
            </div>
        )
    }
    async componentDidMount(){
        document.body.classList.add('bodyBackgroundColor');
        let url = new URL(window.location);
        url.pathname = '/api/get-callback-url';
        let callback_url = await getData(url);
        console.log(`this is the callback_url ${callback_url}`);
        checkAuthenticated(false, callback_url);
    }
}
export default LoginRegister