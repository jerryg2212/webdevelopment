import React from 'react';
import '../../styles/workbenchOperationComponents/manipulateAPlaylist.css';
import { SpotifyAPIBase } from '../helper-components';
import DispalyAllPlaylists from './displayAllPlaylists';
import {spotifyAPIRequest, transitionResponseSongsToFormat} from '../../helper-functions.js';
import UpdatedWorkbenchOptionsComponent from '../updatedWorkBenchOptionsComponent';
import DisplaySongsOption from './manipulateAPlaylistOptions/displaySongsOption';
import AddSongsOption from './manipulateAPlaylistOptions/addSongsOption';
import AddSongsFromSongBankOption from './manipulateAPlaylistOptions/addSongsFromSongBankOption';
import AddSongsToSongBankOption from './manipulateAPlaylistOptions/addSongsToSongBankOption';
import DeleteSongsOption from './manipulateAPlaylistOptions/deleteSongsOption';
import MoveSongsOption from './manipulateAPlaylistOptions/moveSongsOption';
import AddSongsToSongBankBody from './songBankOperations/addSongsToSongBankBody';

/* component that gives user the ability to add songs to a playlist by searching and from song bank, delete songs, display songs and later delete songs */
class ManipulateAPlaylist extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            activePlaylist : false,
            activePlaylistTracks : [],
            activePlaylistId : '',
            activePlaylistImageSrc : '',
            activePlaylistName : '',
            activeOptionComponent : "DisplaySongsOption"
        }
        // object that holds all the option components
        this.optionComponents = {
            DisplaySongsOption : DisplaySongsOption,
            AddSongsOption : AddSongsOption,
            AddSongsFromSongBankOption : AddSongsFromSongBankOption,
            AddSongsToSongBankOption : AddSongsToSongBankOption,
            DeleteSongsOption : DeleteSongsOption,
            MoveSongsOption : MoveSongsOption
        }
        this.playlistClickEventHandler = this.playlistClickEvent.bind(this);
        this.changePlaylistButtonClickEventHandler = this.changePlaylistButtonClickEvent.bind(this);
    }
    render(){
        let ActiveOptionComponent = this.optionComponents[this.state.activeOptionComponent];
        let error = this.returnCorrectErrorMessage();
        let header = (this.state.activePlaylist) ? this.changePlaylistSectionHeader.bind(this) : this.choosePlaylistSectionHeader.bind(this);
        return (
            <div id="manipulateAPlaylistContainer">
                {header()}
                {this.state.activePlaylist && <UpdatedWorkbenchOptionsComponent updateParentState={this.updateActiveOperationComponentState.bind(this)} activeOptionComponent={this.state.activeOptionComponent} options={[{optionComponent : 'DisplaySongsOption', textContent : "Display Songs"}, {optionComponent : 'AddSongsOption', textContent : 'Add Songs'}, {optionComponent : 'AddSongsFromSongBankOption', textContent : "Add Songs From Song Bank"}, {optionComponent : 'AddSongsToSongBankOption', textContent : 'Add Songs To Song Bank'}, {optionComponent : 'DeleteSongsOption', textContent : "DeleteSongs"}, {optionComponent : 'MoveSongsOption', textContent : 'Move Songs'}]} />}
                { !this.state.activePlaylist && <DispalyAllPlaylists rootThis={this.props.rootThis} playlistClickEvent={this.playlistClickEventHandler} accessToken={this.props.accessToken} />}
                { this.state.activePlaylist && <div id="manipulateAPlaylistBody"><ActiveOptionComponent playlistTracks={this.state.activePlaylistTracks} updateParentsTracks={this.updateActivePlaylistTracks.bind(this)} rootThis={this.props.rootThis} accessToken={this.props.accessToken} playlistId={this.state.activePlaylistId}/></div>}
            </div>
        )
    }
    async componentDidMount(){
        try{
            await this.setUserId(this.props.accessToken);
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
    // Headers
        choosePlaylistSectionHeader(){
            return (
                <div className="workbenchOperationDescriptiveHeader">
                    <h1>Choose playlist to manipulate</h1>
                </div>
            )
        }
        changePlaylistSectionHeader(){
            return (
                <div className="workbenchOperationDescriptiveHeader">
                    <div id="activePlaylistContainer">
                        <button className="playSongContainerButton" onClick={this.changePlaylistButtonClickEventHandler}>Change Playlist</button>
                        <img src={this.state.activePlaylistImageSrc || undefined}/>
                        <p>{this.state.activePlaylistName}</p>
                    </div>
                </div>
            )
        }
    // click event passed to the container of every playlist that the user can select from
    // saves the active song information
    async playlistClickEvent(ev){
        let attributes = (ev.target.classList.contains('playlistContainer')) ? ev.target.attributes : ev.target.parentElement.attributes;
        await  this.setTracks(attributes.playlistid.value);
        this.setState({
            activePlaylist: true,
            activePlaylistId : attributes.playlistid.value,
            activePlaylistImageSrc : attributes.playlistimagesrc.value || undefined,
            activePlaylistName : attributes.playlistname.value
        });
        //this.setTracks(attributes.playlistid.value);
    }
    // saves all the users tracks
    async setTracks(playlistId){
        // getting the tracks and saving them
        let songs = [];
        let nextHref = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        try{
            while(nextHref != null){
                let playlistResponse = await spotifyAPIRequest(nextHref, this.props.accessToken);
                let tracksPagingObject = JSON.parse(playlistResponse);
                songs = songs.concat(tracksPagingObject.items);
                nextHref = tracksPagingObject.next;
            }
            songs = this.removeDuplicateSongs(songs);
            songs = transitionResponseSongsToFormat(songs);
            this.setState({
                activePlaylistTracks : songs
            })
        }catch(err){
            this.handleResponseForErrors(err);
        }
    }
    // function that updates the state so it rerenders with the newly active component
    updateActiveOperationComponentState(newActiveOption){
        this.setState({activeOptionComponent : newActiveOption})
    }
    // function that updates the tracks in the state
    updateActivePlaylistTracks(){
        this.setTracks(this.state.activePlaylistId);
    }
    changePlaylistButtonClickEvent(ev){
        this.setState({activePlaylist : false, activePlaylistTracks : []})
    }
    // removes duplicate songs in the playlist because duplicate songs causes bugs
    removeDuplicateSongs(songs){
        let setOfSongs = new Set();
        let resultSongs = [];
        for (let song of songs){
            if(setOfSongs.has(song.track.uri)){}
            else{resultSongs.push(song);setOfSongs.add(song.track.uri);}
        }
        console.log(resultSongs);
        return resultSongs;
    }
    // function that returns the array of songs returned from Spotify in the right format. Sometimes the Spotify API returns a Song object with a Track object nested inside it with information from the song. So we reduce the Track with the Song object
    transitionResponseSongsToFormat(songs){
        let result = []
        if(songs.track){
            for(let song of songs){
                result.push(song.track);
            }
        }else{}
        return result
    }
}


export default ManipulateAPlaylist