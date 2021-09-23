import React from 'react';
import SongListContainer from '../../songListContainer';


class DisplaySongBankBody extends React.Component{
    constructor(props){
        super(props);
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
    async componentDidMount(){
        // make request to server to get the array of song ids from the database
        // make request to spotify to get the songs
    }
}

export default DisplaySongBankBody