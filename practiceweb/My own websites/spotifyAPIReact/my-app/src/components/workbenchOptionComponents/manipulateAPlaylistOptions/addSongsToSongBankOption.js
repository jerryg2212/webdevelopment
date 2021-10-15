import React from 'react';


// component for the add songs to song bank option
// properties
    // playlistTracks = array with tracks objects that represents the tracks in the playlist
    // playlistId = the id of the playlist so we can add songs to it
    // updateParentsTracks = a function that updates the parents tracks forcing a rerender with a new playlistTracks property
    // rootThis = reference to the root component for the purposes of the spotifyAPIBase component
    // accessToken

class AddSongsToSongBankOption extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            'this is the add songs to song bank option'
        )
    }
}

export default AddSongsToSongBankOption