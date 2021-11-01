import React from 'react';
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {amountOfColumns} from '../../../helper-functions.js';
import SearchSongControlComponent from '../../searchSongControlComponent';
import {spotifyAPIRequestPost} from '../../../helper-functions';

// component for the add songs option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // accessToken
    // getNewAccessToken = function lets the root get a new access token 
class AddSongsOption extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <>
            <SearchSongControlComponent submitEventHandler={this.addSongToPlaylist.bind(this)} accessToken={this.props.accessToken} submitButtonText="Add Song"/>
            <SongListContainer songList={this.props.playlistTracks} columns={amountOfColumns(this.props.playlistTracks.length)} />
            </>
        )
    }
    // adds the new song to the playlist and then updates the parents state to it has access to the new song
    async addSongToPlaylist(songUri){
        try{
            await this.props.addSongsToPlaylist(this.props.playlistId, [songUri]);
            await this.props.updateParentsTracks();
        }catch(err){
            console.log(err);
        }
    }
}

export default SpotifyAPIBaseComposition(AddSongsOption)