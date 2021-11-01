import React from 'react';
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from '../../helper-components';
import SongListContainer from '../../songListContainer';
import {getSongsFromSongBankRequest, getSongsRequestUrl, spotifyAPIRequest, commaSeperatedItemsUrl, spotifyAPIRequestPost, transitionResponseSongsToFormat} from '../../../helper-functions';


// component for the add songs from song bank option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // accessToken
    // getNewAccessToken = function lets the root get a new access token 
class AddSongsFromSongBankOption extends React.Component{
    constructor(props){
        super(props);
        this.state = {songsFromSongBank : [], selectedSongBankSongsUris : new Set()}
        this.selectAllChangeEventHandler = this.selectAllChangeEvent.bind(this);
        // ref to the checkbox
        this.selectAllSongsCheckBox = React.createRef();
    }
    render(){
        return(
            <div id="manipulateAPlaylistAddSongsFromSongBankOption">
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
            await this.setSongs();
        }catch(err){
            console.log(err);
        }
    }
    // saves the songs in the song bank to the state value songsFromSongBank
    async setSongs(){
        try{
            // gets the array of song ids from the database
            let songIds = await this.props.getSongIdsFromSongBank();
            let songs = await this.props.getSongsFromIds(songIds);
                this.setState({
                    songsFromSongBank : songs
                });
        }catch(err){
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
    async addSongsButtonClickEvent(ev){
        let selectedSongBankSongsUris = Array.from(this.state.selectedSongBankSongsUris.values());
            try{
                await this.props.addSongsToPlaylist(this.props.playlistId, selectedSongBankSongsUris);
                // clearing the selected song bank songs uris and saving it so their active class goes away
                let tempSelectedSongBankSongsUris = this.state.selectedSongBankSongsUris;
                tempSelectedSongBankSongsUris.clear();
                this.selectAllSongsCheckBox.current.checked = false;
                this.setState({selectedSongBankSongsUris : tempSelectedSongBankSongsUris});
            }catch(err){
                console.log(err);
            }finally{
                this.props.updateParentsTracks();
            }
    }
}

export default SpotifyAPIBaseComposition(AddSongsFromSongBankOption)