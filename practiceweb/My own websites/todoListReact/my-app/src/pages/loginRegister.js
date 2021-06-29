import React from 'react';
import '../styles/loginRegister.css';
class LoginRegister extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="loginRegisterBody">
                <h1>Login</h1>
                <form action={this.props.action} method="POST">
                    <label id="emailLabel" for="emailInput">Email</label>
                    <input type="email" name="email" className="textInput"></input>
                    <label id="passwordLabel" for="passwordInput">Password</label>
                    <input type="password" name="password" className="textInput"></input>
                    <button type="submit" className="submitButton">Login</button>
                    <a href={this.props.link}>Register</a>
                </form>
            </div>
        )
    }
    componentDidMount(){
        document.body.classList.add('bodyBackgroundColor');
    }
}
export default LoginRegister