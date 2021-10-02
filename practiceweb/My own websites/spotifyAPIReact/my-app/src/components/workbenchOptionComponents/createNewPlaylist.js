import { spotifyAPIRequestPost } from '../../helper-functions';
import '../../styles/workbenchOperationComponents/createNewPlaylist.css';
import {SpotifyAPIBase} from '../helper-components';
import React from 'react';

class CreateNewPlaylist extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            newPlaylistName : '',
            publicPlaylistCheckedValue : 'false',
            collaborativeCheckedValue : 'false',
            newPlaylistNameError : false,
            inputElementNotTouched : true,
            publicCollaborativeError : false,

        }
        this.newPlaylistNameInputInputEventHandler = this.newPlaylistNameInputInputEvent.bind(this);
        this.createNewPlaylistFormSubmitEventHandler = this.createNewPlaylistFormSubmitEvent.bind(this);
        // event handler for the public playlist radio buttons
        this.publicPlaylistRadioButtonsChangeEventHandler = this.publicPlaylistRadioButtonsChangeEvent.bind(this);
        // event handler for the collaborative radio buttons
        this.collaborativeRadioButtonChangeEventHandler = this.collaborativeRadioButtonChangeEvent.bind(this);
        // ref for the playlist name input
        this.playlistNameInputRef = React.createRef();
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        console.log(`public playlist is ${this.state.publicPlaylistCheckedValue} and collaborative is ${this.state.collaborativeCheckedValue}`);
        return(
            <div id="createNewPlaylistContainer">
                {error}
                <header className="workbenchOperationDescriptiveHeader">
                    <p>Create New Playlist</p>
                </header>
                <form style={{marginTop : '30px'}} onSubmit={this.createNewPlaylistFormSubmitEventHandler}>
                    <label className={`createNewPlaylistLabelHeader`} style={{marginTop: "0px"}}>Playlist Name</label><br/>
                    <input ref={this.playlistNameInputRef} type="text" value={this.state.newPlaylistName} onInput={this.newPlaylistNameInputInputEventHandler} className={(this.state.newPlaylistNameError && !this.state.inputElementNotTouched) ? 'inputErrorStyle' : ''}></input><br/>
                    <label className="createNewPlaylistLabelHeader">Public Playlist</label><br/>
                        <label htmlFor="publicPlaylistYes">Yes</label>
                        <input type="radio" name="publicPlaylist" value="true" id="publicPlaylistYes" onChange={this.publicPlaylistRadioButtonsChangeEventHandler} checked={this.state.publicPlaylistCheckedValue === 'true'}></input>
                        <label htmlFor="publicPlaylistNo">No</label>
                        <input type="radio" name="publicPlaylist" value="false" checked id="publicPlaylistNo" onChange={this.publicPlaylistRadioButtonsChangeEventHandler} checked={this.state.publicPlaylistCheckedValue === 'false'}></input><br/>
                    <label className="createNewPlaylistLabelHeader">Collaborative</label><br/>
                        <label htmlFor="collaborativePlaylistYes">Yes</label>
                        <input type="radio" name="collaborativePlaylist" value="true" id="collaborativePlaylistYes" onChange={this.collaborativeRadioButtonChangeEventHandler} checked={this.state.collaborativeCheckedValue === 'true'}></input>
                        <label htmlFor="collaborativePlaylistNo">No</label>
                        <input type="radio" name="collaborativePlaylist" value="false" id="collaborativePlaylistNo" onChange={this.collaborativeRadioButtonChangeEventHandler} checked={this.state.collaborativeCheckedValue === 'false'}></input><br/>
                    <button type="submit" className="secondaryButtonStyle" style={{marginTop : '20px'}}>Create Playlist</button>
                    {this.state.publicCollaborativeError && <span id="createNewPlaylistFormPublicCollaborativeErrorMessage">A playlist cannot be both public and collaborative.</span>}
                </form>
            </div>
        )
    }
    async componentDidMount(){
        try{
            this.setUserId(this.props.accessToken);
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
    newPlaylistNameInputInputEvent(ev){
        let newPlaylistNameError = false;
        if(ev.target.value.length < 1){newPlaylistNameError = true}
        this.setState({newPlaylistName : ev.target.value, newPlaylistNameError : newPlaylistNameError, inputElementNotTouched : false});
    }
    // submit event for the create new playlist form
    async createNewPlaylistFormSubmitEvent(ev){
        ev.preventDefault();
        // if the name of the new playlist is blank, do not create the new playlist
        if(this.state.newPlaylistNameError || this.state.publicCollaborativeError){return}
        // make the object with the values to send to server
        let requestBodyParameters = {
            name : this.state.newPlaylistName,
            public : new Boolean(this.state.publicPlaylistCheckedValue === "true"),
            collaborative : new Boolean(this.state.collaborativeCheckedValue === "true")
        }
        requestBodyParameters = JSON.stringify(requestBodyParameters);
        // creating the url to send to
        let url = `https://api.spotify.com/v1/users/${this.userId}/playlists`
        let response = spotifyAPIRequestPost(url, this.props.accessToken, requestBodyParameters);
        this.playlistNameInputRef.current.value = '';

    }
    // change event handler for the public playlist radio buttons
    publicPlaylistRadioButtonsChangeEvent(ev){
        this.setState({publicPlaylistCheckedValue : ev.target.value, publicCollaborativeError : (ev.target.value === 'true' && this.state.collaborativeCheckedValue === 'true')});
    }
    // change event handler for the collaborative radio buttons
    collaborativeRadioButtonChangeEvent(ev){ 
        this.setState({collaborativeCheckedValue : ev.target.value, publicCollaborativeError : (ev.target.value === 'true' && this.state.publicPlaylistCheckedValue === 'true')});
    }
}

export default CreateNewPlaylist