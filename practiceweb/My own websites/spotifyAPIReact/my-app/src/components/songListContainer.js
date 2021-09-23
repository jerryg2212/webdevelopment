import React from 'react';
import SongListColumn from './songListColumn';
import '../styles/songListContainer.css';


class SongListContainer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="activePlaylistSongsListContainer">
                {this.splitSongs().map((elm, ind, arr) => (
                    <SongListColumn key={ind} songs={elm}/>
                ))}
            </div>
        )
    }
    // returns array with arrays of songs split evenly
    splitSongs(){
        let songs = this.props.songList;
        let seperator = Math.ceil(songs.length / this.props.columns);
        let result = [];
        for(let i = 0; i < this.props.columns; i++){
            result.push(songs.splice(0, seperator));
        }
        return result;
    }
}

export default SongListContainer