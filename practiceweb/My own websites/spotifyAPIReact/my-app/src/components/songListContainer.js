import React from 'react';
import SongListColumn from './songListColumn';
import '../styles/songListContainer.css';


class SongListContainer extends React.Component{
    constructor(props){
        super(props);
      //  this.songs = this.props.songList;
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
        let seperator = Math.ceil(this.props.songList.length / this.props.columns);
        let result = [];
        let tem;
        for(let i = 0; i < this.props.columns; i++){
           // result.push(this.songs.splice(0, seperator));
           tem = this.props.songList.slice(i * seperator, (i * seperator + seperator));
           result.push(tem);
        }
        return result;
    }
}

export default SongListContainer