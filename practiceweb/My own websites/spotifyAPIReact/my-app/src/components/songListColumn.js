import React from 'react';


// props
    // activeClassAdder = a function that takes the song id and uri as a parameters and return true or false in order to add the active class or not
class SongListColumn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
         let body = (this.props.songs[0].track != undefined) ? this.goThroughTrackDisplay.bind(this) : this.trackDisplay.bind(this);
        return(
            <div className="songListColumn">
                {body()}
            </div>
        )
    }
    // if song list has to go through the track property before accessing the data
    goThroughTrackDisplay(){
        return(
            this.props.songs.map((elm, index, arr) => (
                <div className={`songListContainer ${(this.props.activeClassAdder(elm.track.id, elm.track.uri)) ? 'removeableSongListContainer' : ''}`} key={elm.id} onClick={(this.props.listItemClickEventHandler) ? this.props.listItemClickEventHandler.bind(this, elm.track.id, elm.track) : undefined}>
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
                <div className={`songListContainer ${(this.props.activeClassAdder(elm.id, elm.uri)) ? 'removeableSongListContainer' : ''}`} key={elm.id} onClick={(this.props.listItemClickEventHandler) ? this.props.listItemClickEventHandler.bind(this, elm.id, elm) : undefined}>
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