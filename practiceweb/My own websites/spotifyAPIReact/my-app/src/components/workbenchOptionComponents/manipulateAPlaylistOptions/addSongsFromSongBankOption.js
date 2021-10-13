import React from 'react';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {getSongsFromSongBankRequest, getSongsRequestUrl, spotifyAPIRequest} from '../../../helper-functions';


// component for the add songs from song bank option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // rootThis = reference to the root component for the purposes of the spotifyAPIBase component
    // accessToken
class AddSongsFromSongBankOption extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {songsFromSongBank : [], selectedSongBankSongs : new Set()}
        this.selectAllChangeEventHandler = this.selectAllChangeEvent.bind(this);
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        return(
            <div id="manipulateAPlaylistAddSongsFromSongBankOption">
                {error}
                <div id="manipulateAPlaylistAddSongsFromSongBankSongBankSongs">
                    <h1 className="secondaryHeader">Song Bank</h1>
                    <button className="secondaryButtonStyle" onClick={this.addSongsButtonClickEvent.bind(this)}>Add Songs</button>
                    <label>Select All<input type="checkbox" onChange={this.selectAllChangeEventHandler}></input></label>
                    {(this.state.songsFromSongBank.length > 0) && <SongListContainer columns={1} songList={this.state.songsFromSongBank} listItemClickEventHandler={this.songBankSongContainerClickEvent.bind(this)} activeClassAdder={this.activeClassAdder.bind(this)} />}
                </div>
                <div id="manipulateAPlaylistAddSongsFromSongBankPlaylistSongs">
                    <h1 className="secondaryHeader">Playlist</h1>
                    <SongListContainer songList={this.props.playlistTracks} columns={2}/>
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
                console.log('did not fail getting the ids');
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
    songBankSongContainerClickEvent(songId, elm, ev){
        console.log(elm);
        let selectedSongBankSongs = this.state.selectedSongBankSongs;
        // item is already selected so deselect it
        if(selectedSongBankSongs.has(songId)){
            selectedSongBankSongs.delete(songId);
        }
        // item is not selected so select it
        else{
            selectedSongBankSongs.add(songId);
        }
        this.setState({selectedSongBankSongs : selectedSongBankSongs})
    }
    // change event handler for the checkbox that either selects or deselects all the songs
    selectAllChangeEvent(ev){
        let selectedSongBankSongs = this.state.selectedSongBankSongs;
        // if the box is checked
        if(ev.target.checked){
            for(let song of this.state.songsFromSongBank){
                selectedSongBankSongs.add(song.id);
            }
        }
        // if the box is not checked
        else{
            selectedSongBankSongs.clear();
        }
        this.setState({selectedSongBankSongs : selectedSongBankSongs});
    }
    // function that give the song id returns true or false depending on whether or not the song is selected
    activeClassAdder(id){
        return this.state.selectedSongBankSongs.has(id);
    }
    // click event handler for the add songs button that adds the songs to the playlist then refreshes
    addSongsButtonClickEvent(ev){
        // if their are no selected songs return
        if(this.state.selectedSongBankSongs.size() < 1){return}

    }
}

export default AddSongsFromSongBankOption