import React, {useState, useEffect} from "react";
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from "../helper-components";
import { removeDuplicateSongs } from "../../helper-functions";
import '../../styles/workbenchOperationComponents/compareTwoPlaylists.css';
import PlaylistsDropDown from "../helperComponents/PlaylistsDropDown";
import SongListContainer from "../songListContainer";


// component that lets the user compare two playlists
// properties
    // accessToken
    // refreshToken
class CompareTwoPlaylists extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            usersPlaylists : [],
            playlistOneId : undefined,
            playlistTwoId : undefined,
            playlistOneTracks : [],
            playlistTwoTracks : [],
            compareActive : false // lets the render method know wheter or not to display the songs in both the playlists
        }
    }
    render(){
        return (
            <div id="compareTwoPlaylistsContainer">
                <header className="workbenchOperationDescriptiveHeader"><h1>Compare Two Playlists</h1></header>
                <div id="selectPlaylistsContainer">
                    <div id="selectPlaylistOneContainer">
                        <h1 className="primaryHeader">Playlist 1</h1>
                        {<PlaylistsDropDown updateParentState={this.updatePlaylistOneId.bind(this)} playlists={this.state.usersPlaylists} />}
                    </div>
                    <div id="compareButtonContainer">
                        <button className="secondaryButtonStyle" onClick={this.compareButtonClickEvent.bind(this)}>Compare</button>
                    </div>
                    <div id="selectPlaylistTwoContainer">
                        <h1 className="primaryHeader">Playlist 2</h1>
                        {<PlaylistsDropDown updateParentState={this.updatePlaylistTwoId.bind(this)} playlists={this.state.usersPlaylists} />}
                    </div>
                </div>
                {this.playlistsTracksBody()}
            </div>
        )
    }
    async componentDidMount(){
        try{
            await this.setAllPlaylists();
        }catch(err){
            console.log(err);
        }
    }
    // Sets information
        // saves to state all the users playlists
        async setAllPlaylists(){
            let playlists = await this.props.allUsersPlaylists();
            this.setState({usersPlaylists : playlists});
        }
        // saves the songs in playlistOne to the state
        async setPlaylistOneTracks(id = this.state.playlistOneId){
            try{
                let songs = await this.props.getPlaylistTracks(id);
                this.setState({playlistOneTracks : songs});
            }catch(err){
                console.log(`There was an error getting playlist One's songs Error: ${err}`);
            }
        }
        // saves the songs in playlistTwo to the state
        async setPlaylistTwoTracks(id = this.state.playlistTwoId){
            try{
                let songs = await this.props.getPlaylistTracks(id);
                this.setState({playlistTwoTracks : songs});
            }catch(err){
                console.log(`There was an error getting playlist One's songs Error: ${err}`);
            }
        }
    // returns Components
        playlistsTracksBody(){
            if(this.state.compareActive){
                return <SongListContainer songList={removeDuplicateSongs(this.state.playlistTwoTracks.concat(this.state.playlistOneTracks))} columns={1}></SongListContainer>
            }
            return 
            
        }
    
    // Events
        // click event for the compare button
        compareButtonClickEvent(ev){
            let playlistOneId = this.state.playlistOneId;
            let playlistTwoId = this.state.playlistTwoId;
            // at least one playlist's tracks are not saved
            if(playlistOneId == undefined && playlistTwoId == undefined){
                console.log('please select two playlists to compare');
            }else{
                this.setDifferencesAndSimilarities();
                this.setState({compareActive : true});
            }
        }   
            // sets state to represent all the differences or similarities of the songs in both playlists
            setDifferencesAndSimilarities(){
                let playlistOneIdsSet = this.returnSetOfIds(this.state.playlistOneTracks);
                let playlistTwoIdsSet = this.returnSetOfIds(this.state.playlistTwoTracks);
                let songsIdsInBoth = new Set();
                let songsIdsInOneButNotTwo = new Set();
                let songsIdsInTwoButNotOne = new Set();
                let playlistOneIdsArray = Array.from(playlistOneIdsSet.values());
                let playlistTwoIdsArray = Array.from(playlistTwoIdsSet.values());
                if(playlistOneIdsArray.length > playlistTwoIdsArray.length){

                }else{
                    
                }
                

            }
            // returns a Set of ids from the songs paramter
            returnSetOfIds(songs){
                let ids = new Set();
                for(let song of songs){
                    ids.add(song.id);
                }
                return ids;
            }

    // Random
        // updates the playlistOneId state value
        updatePlaylistOneId(playlist){
            this.setState({playlistOneId : playlist.id});
            this.setPlaylistOneTracks(playlist.id);
        }
        // updates the playlistTwoId state value
        updatePlaylistTwoId(playlist){
            this.setState({playlistTwoId : playlist.id});
            this.setPlaylistTwoTracks(playlist.id);
        }
}
export default SpotifyAPIBaseComposition(CompareTwoPlaylists);

   /* // component that controls selecting a playlist
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
        / component elements
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
            }
            // returns the correct button element 
            changeSelectButton(){
                // their is an active playlist so return the change button
                if(this.state.isActivePlaylist){return <button className="secondaryButtonStyle" style={{"margin-top" : "15px"}}>Change</button>}
                // there is not an active playlist so return the select button
                else{return <button className="secondaryButtonStyle" style={{"marginTop" : "15px"}}>Select</button>}
            }
    }*/