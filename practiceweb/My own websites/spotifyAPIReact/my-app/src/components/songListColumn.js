import React from 'react';


class SongListColumn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
       // console.log(Object.keys(this.props.songs.track).length > 0)
       // let body = (Object.keys(this.props.songs.track).length > 0) ?  this.goThroughTrackDisplay.bind(this) : this.trackDisplay.bind(this);
         let body = (this.props.songs[0].track != undefined) ? this.goThroughTrackDisplay.bind(this) : this.trackDisplay.bind(this);
      //  let body = 'k';
        /*return (
            <div className="songListColumn" onClick={this.props.clickEventHandler}>
                {this.props.songs.map((elm, index, arr) => (
                <div className="songListContainer" key={index}>
                    <img src={(elm.track.album.images[2]) ? elm.track.album.images[2].url : ''} />
                    <p>
                        <span>{elm.track.name}</span>
                        <span className="trackArtist">{elm.track.artists[0].name}</span>
                    </p>
                </div>
            )
                )}
            </div>  
        )*/
        return(
            <div className="songListColumn" onClick={this.props.clickEventHandler}>
                {body()}
            </div>
        )
    }
    // if song list has to go through the track property before accessing the data
    goThroughTrackDisplay(){
        return(
            this.props.songs.map((elm, index, arr) => (
                <div className="songListContainer" key={index}>
                    <img src={(elm.track.album.images[2]) ? elm.track.album.images[2].url : ''} />
                    <p>
                        <span>{elm.track.name}</span>
                        <span className="trackArtist">{elm.track.artists[0].name}</span>
                    </p>
                </div>
            )
                )
        )
    }
    // the song list does not have to go through the track property before accessing the data
    trackDisplay(){
        return (
            this.props.songs.map((elm, index, arr) => (
                <div className="songListContainer" key={index}>
                    <img src={(elm.album.images[2]) ? elm.album.images[2].url : ''} />
                    <p>
                        <span>{elm.name}</span>
                        <span className="trackArtist">{elm.artists[0].name}</span>
                    </p>
                </div>
            )
                )
        )
    }
}
export default SongListColumn