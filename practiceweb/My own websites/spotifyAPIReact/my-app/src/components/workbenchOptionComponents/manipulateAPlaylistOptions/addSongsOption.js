import React from 'react';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {amountOfColumns} from '../../../helper-functions.js';
import SearchSongControlComponent from '../../searchSongControlComponent';
import {spotifyAPIRequestPost} from '../../../helper-functions';

// component for the add songs option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // rootThis = reference to the root component for the purposes of the spotifyAPIBase component
    // accessToken
class AddSongsOption extends SpotifyAPIBase{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
            <SearchSongControlComponent rootThis={this.props.rootThis} submitEventHandler={this.addSongToPlaylist.bind(this)} accessToken={this.props.accessToken}/>
            <SongListContainer songList={this.props.playlistTracks} columns={amountOfColumns(this.props.playlistTracks.length)} />
            </>
        )
    }
    // adds the new song to the playlist and then updates the parents state to it has access to the new song
    addSongToPlaylist(songUri){
        let url = `https://api.spotify.com/v1/playlists/${this.props.playlistId}/tracks?uris=${songUri}`;
        spotifyAPIRequestPost(url, this.props.accessToken);
        this.props.updateParentsTracks();
    }
}

export default AddSongsOption