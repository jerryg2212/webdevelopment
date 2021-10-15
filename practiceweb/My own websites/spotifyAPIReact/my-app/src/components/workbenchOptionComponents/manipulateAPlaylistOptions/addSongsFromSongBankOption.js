import React from 'react';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {getSongsFromSongBankRequest, getSongsRequestUrl, spotifyAPIRequest, commaSeperatedItemsUrl, spotifyAPIRequestPost} from '../../../helper-functions';


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
        this.state = {songsFromSongBank : [], selectedSongBankSongsUris : new Set()}
        this.selectAllChangeEventHandler = this.selectAllChangeEvent.bind(this);
        // ref to the checkbox
        this.selectAllSongsCheckBox = React.createRef();
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        return(
            <div id="manipulateAPlaylistAddSongsFromSongBankOption">
                {error}
                <div id="manipulateAPlaylistAddSongsFromSongBankSongBankSongs">
                    <h1 className="secondaryHeader">Song Bank</h1>
                    <button className="secondaryButtonStyle" onClick={this.addSongsButtonClickEvent.bind(this)}>Add Songs</button>
                    <label >Select All<input type="checkbox" onChange={this.selectAllChangeEventHandler} ref={this.selectAllSongsCheckBox}></input></label>
                    {(this.state.songsFromSongBank.length != 0) && <SongListContainer columns={1} songList={this.state.songsFromSongBank} listItemClickEventHandler={this.songBankSongContainerClickEvent.bind(this)} activeClassAdder={this.activeClassAdder.bind(this)} />}
                </div>
                <div id="manipulateAPlaylistAddSongsFromSongBankPlaylistSongs">
                    <h1 className="secondaryHeader">Playlist</h1>
                    {(this.props.playlistTracks.length != 0) && <SongListContainer songList={this.props.playlistTracks} columns={2}/>}
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
    songBankSongContainerClickEvent(songId, elm, ev){
        let selectedSongBankSongsUris = this.state.selectedSongBankSongsUris;
        // item is already selected so deselect it
        if(selectedSongBankSongsUris.has(elm.uri)){
            selectedSongBankSongsUris.delete(elm.uri);
        }
        // item is not selected so select it
        else{
            selectedSongBankSongsUris.add(elm.uri);
        }

        this.setState({selectedSongBankSongsUris : selectedSongBankSongsUris});
    }
    // change event handler for the checkbox that either selects or deselects all the songs
    selectAllChangeEvent(ev){
        let selectedSongBankSongsUris = this.state.selectedSongBankSongsUris;
        // if the box is checked
        if(ev.target.checked){
            for(let song of this.state.songsFromSongBank){
                selectedSongBankSongsUris.add(song.uri);
            }
        }
        // if the box is not checked
        else{
            selectedSongBankSongsUris.clear();
        }
        this.setState({selectedSongBankSongsUris : selectedSongBankSongsUris});
    }
    // function that give the song id returns true or false depending on whether or not the song is selected
    activeClassAdder(id, uri){
        return this.state.selectedSongBankSongsUris.has(uri);
    }
    // click event handler for the add songs button that adds the songs to the playlist then refreshes
    async addSongsButtonClickEvent(ev){
        // if their are no selected songs return
        if(this.state.selectedSongBankSongsUris.size < 1){return}
        let url = commaSeperatedItemsUrl(`https://api.spotify.com/v1/playlists/${this.props.playlistId}/tracks?uris=`)(this.state.selectedSongBankSongsUris.values());
        console.log(`this is the url ${url}`);
        try{
            let response = await spotifyAPIRequestPost(url, this.props.accessToken);
            this.props.updateParentsTracks();
            // clearing the selected song bank songs uris and saving it so their active class goes away
                let selectedSongBankSongsUris = this.state.selectedSongBankSongsUris;
                selectedSongBankSongsUris.clear();
                this.selectAllSongsCheckBox.current.checked = false;
                this.setState({selectedSongBankSongsUris : selectedSongBankSongsUris})
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
}

export default AddSongsFromSongBankOption