import React, {useState, useEffect} from "react";
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from "../helper-components";
import '../../styles/workbenchOperationComponents/compareTwoPlaylists.css';
import PlaylistsDropDown from "../helperComponents/PlaylistsDropDown";


// component that lets the user compare two playlists
// properties
    // accessToken
    // refreshToken
class CompareTwoPlaylists extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let PlaylistOneContainerComponent = SpotifyAPIBaseComposition(SelectAPlaylist);
        return (
            <div id="compareTwoPlaylistsContainer">
                <header className="workbenchOperationDescriptiveHeader"><h1>Compare Two Playlists</h1></header>
                <div id="selectPlaylistsContainer">
                    <div id="selectPlaylistOneContainer">
                        <h1 className="primaryHeader">Playlist 1</h1>
                        {<PlaylistOneContainerComponent accessToken={this.props.accessToken} refreshToken={this.props.refreshToken} getNewAccessToken={this.props.getNewAccessToken}/>}
                    </div>
                    <div id="selectPlayistTwoContainer"></div>
                </div>
            </div>
        )
    }
}
export default SpotifyAPIBaseComposition(CompareTwoPlaylists);

    // component that controls selecting a playlist
    // props
        // updateParentState = function that updates the parent state when a new playlist is selected
    class SelectAPlaylist extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                usersPlaylists : [],
                isActivePlaylist : false,
                activelySelectedPlaylistId : undefined,
                activePlaylistName : '',
                activePlaylistImageSRC : undefined
            }
        }
        async componentDidMount(){
            await this.setAllPlaylists();
        }
        render(){
            console.log(`giving playlistsdeopdown ${this.state.usersPlaylists.length}`);
            return (
                <div id="selectAPlaylistContainer">
                    {this.state.usersPlaylists.length > 0 && <PlaylistsDropDown playlists={this.state.usersPlaylists} />}
                    {this.changeSelectButton()}
                </div>
            )
        }
        // saving information
            // saves to state all the users playlists
            async setAllPlaylists(){
                let playlists = await this.props.allUsersPlaylists();
                this.setState({usersPlaylists : playlists});
            }
        /*// component elements
            // returns the select element so the user can select a playlist
            selectAPlaylistDropDown(){
                return (
                    <div id="selectAPlaylistDropDownContainer">
                    <ul>{this.playlistsDropDownListElements()}</ul>
                    <span></span>
                    </div>
                )
            }
                // returns an array of li elements to populate the dropdown
                playlistsDropDownListElements(){
                    return this.state.usersPlaylists.map((elm, ind, arr) => {
                        return <li key={elm.id} className="playlistsDropDownListElement"><img src={(elm.images[2]) ? elm.images[2].url : ''}/><p>{elm.name}</p></li>
                    })
                }
            // returns playlist details for the active playlist
            activePlaylistDetails(){
                return <p>dsf</p>
            }
            // returns either the playlist details or the select element so the user can select a playlist
            returnPlaylistDetailsOrSelect(){
                // there is an active playlist so return playlist details
                if(this.state.isActivePlaylist){return this.activePlaylistDetails()}
                // there is not an active playlist so return the select element so the user can select a playlist
                else{return this.selectAPlaylistDropDown()}
            }*/
            // returns the correct button element 
            changeSelectButton(){
                // their is an active playlist so return the change button
                if(this.state.isActivePlaylist){return <button className="secondaryButtonStyle" style={{"margin-top" : "15px"}}>Change</button>}
                // there is not an active playlist so return the select button
                else{return <button className="secondaryButtonStyle" style={{"marginTop" : "15px"}}>Select</button>}
            }
    }