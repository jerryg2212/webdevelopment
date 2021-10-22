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
            tracksInBothPlaylists : [],
            tracksInPlaylistOneButNotTwo : [],
            tracksInPlaylistTwoButNotOne : [],
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
            }finally{return}
        }
        // saves the songs in playlistTwo to the state
        async setPlaylistTwoTracks(id = this.state.playlistTwoId){
            try{
                let songs = await this.props.getPlaylistTracks(id);
                this.setState({playlistTwoTracks : songs});
            }catch(err){
                console.log(`There was an error getting playlist One's songs Error: ${err}`);
            }finally{return}
        }
    // returns Components
        playlistsTracksBody(){
            if(this.state.compareActive){
                return (
                    <div id="compareTwoPlaylistsTracksContainer">
                        <div id="tracksInPlaylistOneButNotTwoContainer">
                            <SongListComparisionsComponent songs={this.state.tracksInPlaylistOneButNotTwo} title="Songs In Playlist One Only"/>
                        </div>
                        <div id="tracksBothPlaylists">
                            <SongListComparisionsComponent songs={this.state.tracksInBothPlaylists} title="Songs In Both Playlists"/>
                        </div>
                        <div id="tracksInPlaylistTwoButNotOne">
                            <SongListComparisionsComponent songs={this.state.tracksInPlaylistTwoButNotOne} title="Songs In Playlist Two Only"/>
                        </div>
                    </div>
                )
            }
            return 
            
        }
    
    // Events
        // click event for the compare button
        async compareButtonClickEvent(ev){
            await this.setPlaylistOneTracks(this.state.playlistOneId);
            await this.setPlaylistTwoTracks(this.state.playlistTwoId);
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
                // set of ids for playlist one and two
                    let playlistOneIdsSet = this.returnSetOfIds(this.state.playlistOneTracks);
                    let playlistTwoIdsSet = this.returnSetOfIds(this.state.playlistTwoTracks);
                // sets that holds the ids of the songs seperated
                    let songsIdsInBoth = new Set();
                    let songsIdsInOneButNotTwo = new Set();
                    let songsIdsInTwoButNotOne = new Set();
                    
                let playlistOneIdsArray = Array.from(playlistOneIdsSet.values());
                let playlistTwoIdsArray = Array.from(playlistTwoIdsSet.values());
                let combinedIdsArray = playlistOneIdsArray.concat(playlistTwoIdsArray);
                // adding the ids to their proper set
                    for(let id of combinedIdsArray){
                        // if the id is in both
                        if(playlistOneIdsSet.has(id) && playlistTwoIdsSet.has(id))songsIdsInBoth.add(id);
                        // if the id is in playlistOne only
                        else if(playlistOneIdsSet.has(id)) songsIdsInOneButNotTwo.add(id);
                        // if the id is in playlistTwo only
                        else songsIdsInTwoButNotOne.add(id);
                    }
                // adding the songs to their arrays based on the ids sets
                let tracksInBothPlaylists = [];
                let tracksInPlaylistOneButNotTwo = [];
                let tracksInPlaylistTwoButNotOne = [];
                for(let song of removeDuplicateSongs(this.state.playlistOneTracks.concat(this.state.playlistTwoTracks))){
                    if(songsIdsInBoth.has(song.id))tracksInBothPlaylists.push(song);
                    else if(songsIdsInOneButNotTwo.has(song.id))tracksInPlaylistOneButNotTwo.push(song);
                    else tracksInPlaylistTwoButNotOne.push(song);
                }
                this.setState({tracksInBothPlaylists : tracksInBothPlaylists, tracksInPlaylistOneButNotTwo : tracksInPlaylistOneButNotTwo, tracksInPlaylistTwoButNotOne : tracksInPlaylistTwoButNotOne});
                

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
           // this.setPlaylistOneTracks(playlist.id);
        }
        // updates the playlistTwoId state value
        updatePlaylistTwoId(playlist){
            this.setState({playlistTwoId : playlist.id});
           // this.setPlaylistTwoTracks(playlist.id);
        }
}
export default SpotifyAPIBaseComposition(CompareTwoPlaylists);

    // component that holds comparisions of the songs
    // properties
        // title = the title
        // songs = the songs to be displayed
    class SongListComparisionsComponent extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return(
                <div className="songListComparisionComponentContanier">
                    <h1 className="secondaryHeader" style={{"fontSize" : "18px"}}>{this.props.title}</h1>
                    <label>Select All<input type="checkbox"></input></label>
                    <SongListContainer songList={this.props.songs} columns={1}/>
                </div>
            )
        }
    }
