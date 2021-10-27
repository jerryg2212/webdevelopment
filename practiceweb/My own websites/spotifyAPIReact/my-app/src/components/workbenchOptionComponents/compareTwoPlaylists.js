import React, {useState, useEffect} from "react";
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from "../helper-components";
import { removeDuplicateSongs, addSongsToSongBankRequest } from "../../helper-functions";
import '../../styles/workbenchOperationComponents/compareTwoPlaylists.css';
import PlaylistsDropDown from "../helperComponents/PlaylistsDropDown";
import SongListContainer from "../songListContainer";
import UpdatedWorkbenchOptionsComponent from "../updatedWorkBenchOptionsComponent";


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
            // array of objects that have the properties of type Set "selectedSongIds" and "selectedSongUris"
            selectedSongs : {selectedSongIds : new Set(), selectedSongUris : new Set()},
            compareActive : false // lets the render method know wheter or not to display the songs in both the playlists
        }
        this.tracksInBothPlaylistsRef = React.createRef();
        this.tracksInPlaylistOneButNotTwoRef = React.createRef();
        this.tracksInPlaylistTwoButNotOneRef = React.createRef();
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
                    <div id="selectPlaylistTwoContainer">
                        <h1 className="primaryHeader">Playlist 2</h1>
                        {<PlaylistsDropDown updateParentState={this.updatePlaylistTwoId.bind(this)} playlists={this.state.usersPlaylists} />}
                    </div>
                </div>
                <div id="compareButtonContainer">
                        <button className="secondaryButtonStyle" onClick={this.compareButtonClickEvent.bind(this)}>Compare</button>
                </div>
                {this.returnOptions()}
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

        // updates the state value of selected songs and returns a promise after the state has been updated
        updateSelectedSongs(){
            return new Promise((resolve, reject) => {
                var selectedSongIds = [];
                var selectedSongUris = [];
                selectedSongIds = selectedSongIds.concat(Array.from(this.tracksInBothPlaylistsRef.current.state.selectedSongs.selectedSongIds.values()));
                selectedSongIds = selectedSongIds.concat(Array.from(this.tracksInPlaylistOneButNotTwoRef.current.state.selectedSongs.selectedSongIds.values()));
                selectedSongIds = selectedSongIds.concat(Array.from(this.tracksInPlaylistTwoButNotOneRef.current.state.selectedSongs.selectedSongIds.values()));
                selectedSongUris = selectedSongUris.concat(Array.from(this.tracksInBothPlaylistsRef.current.state.selectedSongs.selectedSongUris.values()));
                selectedSongUris = selectedSongUris.concat(Array.from(this.tracksInPlaylistOneButNotTwoRef.current.state.selectedSongs.selectedSongUris.values()));
                selectedSongUris = selectedSongUris.concat(Array.from(this.tracksInPlaylistTwoButNotOneRef.current.state.selectedSongs.selectedSongUris.values()));
                this.setState({selectedSongs : {selectedSongIds : selectedSongIds, selectedSongUris : selectedSongUris}}, () => {resolve(true)});
            })
        }

    // returns Components
        playlistsTracksBody(){
            if(this.state.compareActive){
                return (
                    <div id="compareTwoPlaylistsTracksContainer">
                        <div id="tracksInPlaylistOneButNotTwoContainer">
                            <SongListComparisionsComponent songs={this.state.tracksInPlaylistOneButNotTwo} title="Songs In Playlist One Only" ref={this.tracksInPlaylistOneButNotTwoRef} />
                        </div>
                        <div id="tracksBothPlaylists">
                            <SongListComparisionsComponent songs={this.state.tracksInBothPlaylists} title="Songs In Both Playlists" ref={this.tracksInBothPlaylistsRef} />
                        </div>
                        <div id="tracksInPlaylistTwoButNotOne">
                            <SongListComparisionsComponent songs={this.state.tracksInPlaylistTwoButNotOne} title="Songs In Playlist Two Only" ref={this.tracksInPlaylistTwoButNotOneRef} />
                        </div>
                    </div>
                )
            }
            return 
        }
    // returns the options component if the compare is activated
        returnOptions(){
            if(this.state.compareActive){
                return(
                    <div id="compareTwoPlaylistsOptionsContainer">
                        <button className="secondaryButtonStyle" onClick={this.addSelectedSongsToSongBank.bind(this)}>Bank Songs</button>
                        <button className="secondaryButtonStyle" onClick={this.addSelectedSongsToPlaylistOne.bind(this)}>Add To Playlist 1</button>
                        <button className="secondaryButtonStyle" onClick={this.addSelectedSongsToPlaylistTwo.bind(this)}>Add To Playlist 2</button>
                    </div>
                )
            }
            return undefined
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
        // click event for the bank songs button
        async addSelectedSongsToSongBank(ev){
            try{
                await this.updateSelectedSongs();
                let selectedSongIds = Array.from(this.state.selectedSongs.selectedSongIds.values());
                let selectedSongIdsBody = {songs : selectedSongIds};
                selectedSongIdsBody = JSON.stringify(selectedSongIdsBody);
                let result = await this.props.addSongsToSongBank(selectedSongIdsBody);
                this.setState({selectedSongs : {selectedSongIds : new Set(), selectedSongUris : new Set()}});
            }catch(err){
                console.log(err);
            }


        }
        // click event for the add songs to playlist 1 button
        addSelectedSongsToPlaylistOne(ev){}
        // click event for the add songs to playlist 2 button
        addSelectedSongsToPlaylistTwo(ev){}

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
            this.state = {
                selectedSongs : {selectedSongIds : new Set(), selectedSongUris : new Set()}, // selected songs has the properties that are both sets "selectedSongIds" and "selectedSongUris"
                selectAllChecked : false
            } 
        }
        render(){
            return(
                <div className="songListComparisionComponentContanier">
                    <h1 className="secondaryHeader" style={{"fontSize" : "18px"}}>{this.props.title}</h1>
                    <label className="selectAllLabel">Select All<input type="checkbox" value={this.state.selectAllChecked} className="selectAllCheckbox" onChange={this.onChangeSelectAll.bind(this)}></input></label>
                    <SongListContainer songList={this.props.songs} columns={1} listItemClickEventHandler={this.songListContainerClickEvent.bind(this)} activeClassAdder={this.activeClassAdder.bind(this)}/>
                </div>
            )
        }
        // click event for the song list container that adds or deletes the songs from the selected songs
        songListContainerClickEvent(id, elm, ev){
            let selectedSongIds = this.state.selectedSongs.selectedSongIds;
            let selectedSongUris = this.state.selectedSongs.selectedSongUris;
            // already active so remove it
            if(selectedSongIds.has(id)){
                selectedSongIds.delete(id);
                selectedSongUris.delete(elm.uri);
            }
            // add it
            else{
                selectedSongIds.add(id);
                selectedSongUris.add(elm.uri);
            }
            this.setState({selectedSongs : {selectedSongIds : selectedSongIds, selectedSongUris : selectedSongUris}});
        }
        // function given to songListColumn to give the container the active class or not
        activeClassAdder(id, uri){
            return this.state.selectedSongs.selectedSongIds.has(id);
        }
        // onChange event for the select all checkbox
        onChangeSelectAll(ev){
            var checked = ev.target.checked;
            var selectedSongIds = this.state.selectedSongs.selectedSongIds;
            var selectedSongUris = this.state.selectedSongs.selectedSongUris;
            // box is checked add all songs and change the value of the checkbox state value to true
            if(checked){
                for(let song of this.props.songs){
                    selectedSongIds.add(song.id);
                    selectedSongUris.add(song.uri);
                }
            }            
            // box is not checked so remove the songs and change the value of the checkbox state value to false
            else{
                for(let song of this.props.songs){
                    selectedSongIds.delete(song.id);
                    selectedSongUris.delete(song.uri);
                }
            }
            this.setState({
                selectAllChecked : checked,
                selectedSongs : {selectedSongIds : selectedSongIds, selectedSongUris : selectedSongUris}
            })
        }
    }
