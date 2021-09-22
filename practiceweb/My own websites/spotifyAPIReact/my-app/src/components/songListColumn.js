import React from 'react';


class SongListColumn extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
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
        )
    }
}
export default SongListColumn