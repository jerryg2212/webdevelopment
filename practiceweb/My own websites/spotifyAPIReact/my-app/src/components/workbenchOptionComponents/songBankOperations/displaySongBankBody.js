import React from 'react';
import SongListContainer from '../../songListContainer';


class DisplaySongBankBody extends React.Component{
    constructor(props){
        super(props);
        //console.log(this.props.songs);
    }
    render(){
        return (
            (this.props.songs.length > 1) && <SongListContainer songList={this.props.songs} columns={this.amountOfColumns(this.props.songs)} /> 
            )
            
    }
        // returns the number of columns wanted based on how many songs their are in the active playlist
        amountOfColumns(songs){
            return  Math.min(Math.ceil(songs.length / 40), 3);
            
        }
}

export default DisplaySongBankBody