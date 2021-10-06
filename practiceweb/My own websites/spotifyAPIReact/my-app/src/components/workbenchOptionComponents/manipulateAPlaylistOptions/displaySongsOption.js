import React from 'react';
import SongListContainer from '../../songListContainer';
import {amountOfColumns} from '../../../helper-functions.js'


// component for the display songs option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
class DisplaySongsOption extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log(this.props.playlistTracks);
        return (
            <SongListContainer songList={this.props.playlistTracks} columns={amountOfColumns(this.props.playlistTracks.length)}/>
        )
    }
}

export default DisplaySongsOption