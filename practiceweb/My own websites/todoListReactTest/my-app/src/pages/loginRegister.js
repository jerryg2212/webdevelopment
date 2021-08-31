import React from 'react';
import '../styles/loginRegister.css';
import checkAuthenticated from './authenticationRequest.js';
import {getData, postData} from './databaseRequests.js';
class LoginRegister extends React.Component{
    constructor(props){
        super(props);
        let search = new URLSearchParams(window.location.search);
        if(props.messages.error){
            this.state = props.messages.error;
        }else{
            this.state = {errorMSG : search.get('errorMSG')}
        }
        
    }
    render(){
        return (
            <div id="loginRegisterBody">
                <h1>{this.props.title}</h1>
                <form action={this.props.action} method="POST" /*onSubmit={this.formSubmitEventHandler}*/>
                    <span id="validationErrorBox" >{this.state.errorMSG}</span>
                    <label id="emailLabel" htmlFor="emailInput">Email</label>
                    <input type="email" name="email" className="textInput" id="emailInput"></input>
                    <label id="passwordLabel" htmlFor="passwordInput">Password</label>
                    <input type="password" name="password" className="textInput" id="passwordInput"></input>
                    <button type="submit" className="submitButton">Login</button>
                    <a href={this.props.link}>{this.props.linkTitle}</a>
                </form>
            </div>
        )
    }
    async componentDidMount(){
        document.body.classList.add('bodyBackgroundColor');
        console.log('login form inplace');
        let url = new URL(window.location);
        url.pathname = '/api/get-callback-url';
        let callback_url = await getData(url);
        checkAuthenticated(false, callback_url);
    }
    formSubmitEventHandler = async (ev) => {
        console.log('request form has been submitted');

        // on Register page
        if(this.props.title === "Register"){
            ev.preventDefault();
            // data to be sent to the server
                let emailValue = document.getElementById('emailInput').value;
                let passwordValue = document.getElementById('passwordInput').value;
                let data = {email: emailValue,
                            password: passwordValue}

            try{
                console.log(this.props.action);
                // get response from the server
                let response = await postData(this.props.action, data);
                window.location = '/login';
                //if there is an error
                if(response.error != null){
                    console.log('error should pop up');
                    document.getElementById('validationErrorBox').textContent = response.error;
                }
                // no error
                else{
                    // if we are on a different page than the call back url change the window location to that url
                    if(window.location.pathname != response.callback_url){
                        console.log('should change window to ' + response.callback_url);
                        window.location = response.callback_url;
                    }
                }

              /* let request = new XMLHttpRequest();
               request.open('POST', this.props.action, true);
               request.setRequestHeader('Content-Type', 'application/json');
               request.send(JSON.stringify({email:'shite', password: 'sdfsdfdsfsddssffdsdsfdsffds'}));*/
            }catch(err){

            }

        }
        // on Login page
        else{

        }
    }
}
export default LoginRegister