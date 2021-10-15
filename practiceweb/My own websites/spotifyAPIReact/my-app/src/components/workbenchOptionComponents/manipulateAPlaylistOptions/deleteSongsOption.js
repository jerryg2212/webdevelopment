import React from 'react';
import SongListContainer from '../../songListContainer';
import {amountOfColumns, spotifyAPIRequestDelete} from '../../../helper-functions';

// component for the delete songs from song bank option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // rootThis = reference to the root component for the purposes of the spotifyAPIBase component
    // accessToken
class DeleteSongsOption extends React.Component{
    constructor(props){
        super(props);
        this.state = {selectAllChecked : false, selectedSongs : new Set()}
        // ref to the check box
        this.selectAllCheckBox = React.createRef();
    }
    render(){
        return(
            <div id="manipulateAPlaylistDeleteSongsOption">
                <button className="secondaryButtonStyle" onClick={this.deleteSongsButtonClickEvent.bind(this)}>Delete Selected Songs</button>
                <label>Select All
                    <input type="checkbox" onChange={this.selectAllClickEvent.bind(this)} checked={this.state.selectAllChecked} ref={this.selectAllCheckBox}/>
                </label>
                <SongListContainer songList={this.props.playlistTracks} columns={amountOfColumns(this.props.playlistTracks.length)} listItemClickEventHandler={this.songContainerClickEvent.bind(this)} activeClassAdder={this.activeClassAdder.bind(this)}/>
            </div>            
        )
    }
    async deleteSongsButtonClickEvent(ev){
        // if there are no selected songs return
        if(this.state.selectedSongs.size < 1){return}
        // delete the songs then update the state
        let selectedSongs = this.state.selectedSongs;
        // the body to go in the request
        let body;
        while(selectedSongs.size > 0){
            let url = `https://api.spotify.com/v1/playlists/${this.props.playlistId}/tracks`;
            [selectedSongs, body] = this.deleteSongsRequestBody(selectedSongs);
            await spotifyAPIRequestDelete(url, this.props.accessToken, body);
        }
        this.setState({selectAllChecked : false});
        await this.props.updateParentsTracks();
    }
        // function that returns a proper body for the request to delete songs from a playlist
        // parameters
            // selectedSongs = a Set of songs that were selected
        // returns
            // an array [selectedSongs = new selectedSongs array, body = the body the be used in the request to the server]
        deleteSongsRequestBody(selectedSongs){
            let body = {tracks : []}
            for(let songUri of selectedSongs.values()){
                body.tracks.push({uri : songUri});
                selectedSongs.delete(songUri);
            }
            body = JSON.stringify(body);
            return [selectedSongs, body]
        }
    // event handler check box
    selectAllClickEvent(ev){
        // either adds all songs to the selectedSongs or removes all songs
        this.setState({selectAllChecked : ev.target.checked}, () => {
            if(this.state.selectAllChecked){this.addAllSongsToSelectedSongs()}
            else{this.removeAllSongsFromSelectedSongs()}
        });
    }
        // adds all the songs to the selectedSongs array
        addAllSongsToSelectedSongs(){
            let selectedSongs = this.state.selectedSongs;
            for(let song of this.props.playlistTracks){
                selectedSongs.add(song.track.uri);
            }
            this.setState({selectedSongs : selectedSongs});
        }
        // removes all the songs from the selectedSongs array
        removeAllSongsFromSelectedSongs(){
            let selectedSongs = this.state.selectedSongs;
            for(let song of this.props.playlistTracks){
                selectedSongs.delete(song.track.uri);
            }
            this.setState({selectedSongs : selectedSongs});
        }

    // function passed to songlistcontainer to update the state to add the newly select or deselected song
    songContainerClickEvent(songId, song, ev){
        let selectedSongs = this.state.selectedSongs;
        // if song is already selected
        if(selectedSongs.has(song.uri)){
            selectedSongs.delete(song.uri);
        }else{selectedSongs.add(song.uri)}
        this.setState({selectedSongs : selectedSongs});
    }
    // function that lets SongListColumn know what songs to give the active class to
    activeClassAdder(songId, songUri){
        return this.state.selectedSongs.has(songUri);
    }
}

export default DeleteSongsOption