import React from 'react';
import  ReactDOM  from 'react-dom';
import axios from 'axios';
import exitIcon from '../icons/exit.svg';
import { spotifyAPIRequest, spotifyAPIRequestPost } from '../helper-functions';
//import { response } from 'express';

// base component for the spotify api that provides functionality for all components
class SpotifyAPIBase extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activateDeviceErrorMessage : false,
            mustHavePremiumAccount : false,
            cannotAccessSongBank : false
                    }
        this.userId = undefined;
    }
    // given a response it handles errors and sets correct error messages and returns true if there is an error
    handleResponseForErrors(response){
        if(this.checkResponseForError(response)){
            this.activateCorrectErrorMessage(response);
        }
        return this.checkResponseForError(response);
    }
    returnCorrectErrorMessage(){
        let error = undefined;
        if(this.state.activateDeviceErrorMessage){
            error = this.activateDeviceErrorMessage();
        }
        if(this.state.mustHavePremiumAccount){
            error = this.mustHavePremiumAccount();
        }
        if(this.state.cannotAccessSongBank){
            error = this.cannotAccessSongBank();
        }
        return error

    }
    activateDeviceErrorMessage(){
        return <ActivateDeviceErrorMessage thisOfParent={this} />
    }
    mustHavePremiumAccount(){
        return <MustHavePremiumAccount thisOfParent={this} />
    }
    cannotAccessSongBank(){
        return <CannotAccessSongBank thisOfParent={this} />
    }
    // given the response from the server it will check for errors and return true if their is one
    checkResponseForError(response){
        if(response.status == undefined){return false}
        if(response.status > 399){return true}
        return false
    }
    async activateCorrectErrorMessage(response){
        if(response.status == 401){
            // need a new access token
            let accessTokenResponse = await axios.post('/refreshToken', {refreshToken : this.props.rootThis.state.refresh_token});
            this.props.rootThis.setState({access_token : accessTokenResponse.data.access_token});
        }
        if(response.status == 403){
            // needs a premium account
            this.setState({mustHavePremiumAccount : true})
        }
        if(response.status == 404){
            // user needs an active device
            this.setState({activateDeviceErrorMessage : true})
        }
        if(response.status == 410){
            // cannot access the song bank
            this.setState({cannotAccessSongBank : true});
        }
    }
    // returns a promise so the component that calls this can make sure it waits to use the access token
    // function given an access token sets the users id
    async setUserId(accessToken){
        return new Promise( async (resolve, reject) => {
            try{
                let userIdResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', accessToken);
                this.userId = JSON.parse(userIdResponse).id;
                resolve();
            }catch(err){
                this.handleResponseForErrors(err);
                reject(err);
            }
        })
    }
}
// general error message component that displays in the middle of screen with message
class ErrorMessage extends React.Component{
    constructor(props){
        super(props);
        this.imgClickEventHandler = this.imgClickEvent.bind(this);
        this.bodyClickEventHandler = this.bodyClickEvent.bind(this);
    }
    render(){
        return ReactDOM.createPortal(<div id="popupErrorMessageContainer" style={{top: `${window.pageYOffset + 100}px`, left : `${window.screen.width / 2 -200}px`}}>
        <img src={exitIcon} onClick={this.imgClickEventHandler}></img>
        <p>{this.props.message}</p>
        </div>, document.body);
        /*return (
            <div id="popupErrorMessageContainer" style={{top: `${window.pageYOffset + 100}px`, left : `${window.screen.width / 2 -200}px`}}>
            <img src={exitIcon} onClick={this.imgClickEventHandler}></img>
            <p>{this.props.message}</p>
            </div>
        )*/
    }
    imgClickEvent(ev){
        this.props.thisOfParent.setState({[this.props.error] : false});
       // document.getElementById('popupErrorMessageContainer').remove();
    }
    componentDidMount(){
        document.body.addEventListener('click', this.bodyClickEventHandler, false);
    }
    componentWillUnmount(){
        document.body.removeEventListener('click', this.bodyClickEventHandler, false);
    }
    bodyClickEvent(ev){
        ev.stopPropagation();
        let popupContainer = document.getElementById('popupErrorMessageContainer');
        let popupContainerPosition = popupContainer.getBoundingClientRect();
        if(ev.clientX > popupContainerPosition.left && ev.clientX < popupContainerPosition.right && ev.clientY > popupContainerPosition.top && ev.clientY < popupContainerPosition.bottom){
            return
        }
        this.props.thisOfParent.setState({[this.props.error]: false});
    }
}

    // error message that is a subclass of the general error message
    // it comes up for when user needs to activate a device
        class ActivateDeviceErrorMessage extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <ErrorMessage message="You Must Activate a Device To Use This Functionality" id={this.props.id} thisOfParent={this.props.thisOfParent} error={'activateDeviceErrorMessage'}></ErrorMessage>
                )
            }
        }
    // error message that is a subclass of the general error message
    // it comes up fore when the user does not have a premium account
        class MustHavePremiumAccount extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <ErrorMessage message="You Must Have a Premium Account To Use This Functionality" thisOfParent={this.props.thisOfParent} error="mustHavePremiumAccount"/>
                )
            }
        }

    // error message that is a subclass of the general error message
    // it comes up for when their is an error with the song bank
        class CannotAccessSongBank extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <ErrorMessage message="There was an error accessing the Song Bank" thisOfParent={this.props.thisOfParent} error="cannotAccessSongBank" />
                )
            }
        }
    
    export {
        SpotifyAPIBase,
        ActivateDeviceErrorMessage
    }