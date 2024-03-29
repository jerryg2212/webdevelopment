import React from 'react';
import SongListColumn from './songListColumn';
import '../styles/songListContainer.css';

// properties
    // songList = array of song objects
    // columns = amount of columns to display
    // listItemClickEventHandler = function to run when each song container is clicked
    // activeClassAdder = a function that is passed to songListColumn and takes the song id as a parameter and return true or false in order to add the active class or not
class SongListContainer extends React.Component{
    constructor(props){
        super(props);
      //  this.songs = this.props.songList;
    }
    render(){
        return (
            <div className="activePlaylistSongsListContainer">
                {this.splitSongs().map((elm, ind, arr) => (
                    <SongListColumn key={ind} songs={elm} listItemClickEventHandler={this.props.listItemClickEventHandler} activeClassAdder={this.props.activeClassAdder}/>
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
           if(tem.length != 0){result.push(tem);}
        }
        return result;
    }
}
SongListContainer.defaultProps = {
    activeClassAdder : (id) => {return false}
}
export default SongListContainer