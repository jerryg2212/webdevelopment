import React from 'react';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {getSongsFromSongBankRequest, getSongsRequestUrl, spotifyAPIRequest, commaSeperatedItemsUrl, spotifyAPIRequestPost, addSongsToSongBankRequest, transitionResponseSongsToFormat} from '../../../helper-functions';


// component for the add songs to song bank option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // rootThis = reference to the root component for the purposes of the spotifyAPIBase component
    // accessToken

class AddSongsToSongBankOption extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {songsFromSongBank : [], selectedPlaylistSongsIds : new Set()}
        this.selectAllChangeEventHandler = this.selectAllChangeEvent.bind(this);
        // ref to the checkbox
        this.selectAllSongsCheckBox = React.createRef();
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        return(
            <div id="manipulateAPlaylistAddSongsToSongBankOption">
                {error}
                <div id="manipulateAPlaylistAddSongsToSongBankSongBankSongs">
                    <h1 className="secondaryHeader">Song Bank</h1>
                    {(this.state.songsFromSongBank.length != 0) && <SongListContainer columns={1} songList={this.state.songsFromSongBank}/>}
                </div>
                <div id="manipulateAPlaylistAddSongsToSongBankPlaylistSongs">
                    <h1 className="secondaryHeader">Playlist</h1>
                    <button className="secondaryButtonStyle" onClick={this.addSongsButtonClickEvent.bind(this)}>Add Songs</button>
                    <label >Select All<input type="checkbox" onChange={this.selectAllChangeEventHandler} ref={this.selectAllSongsCheckBox}></input></label>
                    {(this.props.playlistTracks.length != 0) && <SongListContainer songList={this.props.playlistTracks} listItemClickEventHandler={this.playlistSongContainerClickEvent.bind(this)} activeClassAdder={this.activeClassAdder.bind(this)}  columns={2}/>}
                </div>
            </div>
        )
    }
    async componentDidMount(){
        try{
            await this.setUserId(this.props.accessToken);
            await this.setSongs();
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
    // saves the array of song ids from the song bank to the state
    async getSongIdsFromSongBank(){
        return new Promise(async (resolve, reject) => {
            try{
                let songIdsFromSongBankResponse = await getSongsFromSongBankRequest(this.userId);
                let songIdsFromSongBank = JSON.parse(songIdsFromSongBankResponse);
                resolve(songIdsFromSongBank);
            }catch(err){
                reject(err);
            }
        })
    }
    // saves the array of songs to the state
    async setSongs(songIds){
        try{
            // gets the array of song ids from the database
            let songIds = await this.getSongIdsFromSongBank();
            let songs = [];
            while(songIds.length != 0){
                let maxLengthRequest = Math.min(songIds.length, 50);
                let url = getSongsRequestUrl(songIds.slice(0, maxLengthRequest));
                songIds.splice(0, maxLengthRequest);
                let songsResponse = await spotifyAPIRequest(url, this.props.accessToken);
                songsResponse = JSON.parse(songsResponse);
                songs = songs.concat(songsResponse.tracks);
            }
                this.setState({
                    songsFromSongBank : songs
                });
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
    // click event handler for the song container that either adds or removes the songId from the selected songs
    playlistSongContainerClickEvent(songId, elm, ev){
        let selectedPlaylistSongsIds = this.state.selectedPlaylistSongsIds;
        // item is already selected so deselect it
        if(selectedPlaylistSongsIds.has(elm.id)){
            selectedPlaylistSongsIds.delete(elm.id);
        }
        // item is not selected so select it
        else{
            selectedPlaylistSongsIds.add(elm.id);
            console.log(`added ${elm.id}`);
        }

        this.setState({selectedPlaylistSongsIds : selectedPlaylistSongsIds});
    }
    // change event handler for the checkbox that either selects or deselects all the songs
    selectAllChangeEvent(ev){
        let selectedPlaylistSongsIds = this.state.selectedPlaylistSongsIds;
        // if the box is checked
        if(ev.target.checked){
            for(let track of this.props.playlistTracks){
                selectedPlaylistSongsIds.add(track.id);
            }
        }
        // if the box is not checked
        else{
            selectedPlaylistSongsIds.clear();
        }
        this.setState({selectedPlaylistSongsIds : selectedPlaylistSongsIds});
    }
    // function that give the song id returns true or false depending on whether or not the song is selected
    activeClassAdder(id, uri){
        return this.state.selectedPlaylistSongsIds.has(id);
    }
    // click event handler for the add songs button that adds the songs to the playlist then refreshes
    async addSongsButtonClickEvent(ev){
        console.log('addsongsButtonSclicked');
        // if their are no selected songs return
        if(this.state.selectedPlaylistSongsIds.size < 1){return}
        try{
            let body = {songs : Array.from(this.state.selectedPlaylistSongsIds.values())}
            body = JSON.stringify(body);
            console.log(body);
            let response = await addSongsToSongBankRequest(this.userId, body);
            // update the song bank
            await this.setSongs();
                // clearing the selected song bank songs uris and saving it so their active class goes away
                let selectedPlaylistSongsIds = this.state.selectedPlaylistSongsIds;
                selectedPlaylistSongsIds.clear();
                this.selectAllSongsCheckBox.current.checked = false;
                this.setState({selectedPlaylistSongsIds : selectedPlaylistSongsIds})
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
}

export default AddSongsToSongBankOption