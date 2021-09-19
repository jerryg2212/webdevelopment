import React from 'react'
import { SpotifyAPIBase } from '.././helper-components'
import '../../styles/displayAllSongsInPlaylist.css';
import DispalyAllPlaylists from './workbenchOptionComponents/displayAllPlaylists';
import { spotifyAPIRequestPut, spotifyAPIRequestPost, spotifyAPIRequest } from '../../helper-functions';


class DisplayAllSongsInPlaylist extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            activePlaylist : false,
            activePlaylistTracks : [],
            activePlaylistId : '',
            activePlaylistImageSrc : '',
            activePlaylistName : ''
        }
        this.playlistClickEventHandler = this.playlistClickEvent.bind(this);
        this.changePlaylistButtonClickEventHandler = this.changePlaylistButtonClickEvent.bind(this);
    }
    render(){
       // let body = (this.state.activePlaylist) ? <DispalyAllPlaylists /> : <DispalyAllPlaylists />
     //  let body = (this.state.activePlaylist) ? this.changePlaylistSection : this.choosePlaylistSection;
     //                     {(this.state.activePlaylist) ? this.changePlaylistSection() : this.choosePlaylistSection()}
     let body = (this.state.activePlaylist) ? this.changePlaylistSectionHeader.bind(this) : this.choosePlaylistSectionHeader.bind(this)
        return (
            <Profiler id="testProfiler" onRender={this.profileCallback}>
            <React.Fragment>
                <div id="displayAllSongsInPlaylistHeaderContainer">
                    {body()}
                </div>
                {this.state.activePlaylistTracks.length > 1 && this.activePlaylistSongsList()}
                { !this.state.activePlaylist && <DispalyAllPlaylists rootThis={this.props.rootThis} playlistClickEvent={this.playlistClickEventHandler} accessToken={this.props.accessToken} />}
            </React.Fragment>
            </Profiler>
        )
    }
    profileCallback(){
        console.log(`display all songs in playlist took `)
    }
    choosePlaylistSectionHeader(){
        return (
                <p>Choose playlist to display songs from</p>
        )
    }
     changePlaylistSectionHeader(){
        return (
                <div id="activePlaylistContainer">
                    <button className="playSongContainerButton" onClick={this.changePlaylistButtonClickEventHandler}>Change Playlist</button>
                    <img src={this.state.activePlaylistImageSrc || undefined}/>
                    <p>{this.state.activePlaylistName}</p>
                </div>
        )
    }
    // saves all the users tracks
    async setTracks(playlistId){
        // getting the tracks and saving them
        let songs = [];
        let nextHref = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        try{
            while(nextHref != null){
                let playlistResponse = await spotifyAPIRequest(nextHref, this.props.accessToken);
                let tracksPagingObject = JSON.parse(playlistResponse);
                songs = songs.concat(tracksPagingObject.items);
                nextHref = tracksPagingObject.next;
            }
            this.setState({
                activePlaylistTracks : songs
            })
        }catch(err){
            this.handleResponseForErrors(err);
        }
    }
    // click event passed to the container of every playlist that the user can select from
    // saves the active song information
    async playlistClickEvent(ev){
        let attributes = (ev.target.classList.contains('playlistContainer')) ? ev.target.attributes : ev.target.parentElement.attributes;
        this.setState({
            activePlaylist: true,
            activePlaylistId : attributes.playlistid.value,
            activePlaylistImageSrc : attributes.playlistimagesrc.value || undefined,
            activePlaylistName : attributes.playlistname.value
        });
        this.setTracks(attributes.playlistid.value);
    }
    // returns container that holds all the songs in the users active playlist
    activePlaylistSongsList(){
        return (
            <div id="activePlaylistSongsListContainer">
                {this.splitSongs(this.amountOfColumns()).map((elm, ind, arr) => (
                    <SongListColumn key={ind} songs={elm}/>
                ))}
            </div>
        )
    }
    // returns array with arrays of songs split evenly
    splitSongs(columns){
        let songs = this.state.activePlaylistTracks;
        let seperator = Math.ceil(songs.length / columns);
        let result = [];
        for(let i = 0; i < columns; i++){
            result.push(songs.splice(0, seperator));
        }
        return result;
    }
    // returns the number of columns wanted based on how many songs their are in the active playlist
    amountOfColumns(){
        return  Math.min(Math.ceil(this.state.activePlaylistTracks.length / 40), 3);
        
    }
    changePlaylistButtonClickEvent(ev){
        this.setState({activePlaylist : false})
    }
}

    class SongListColumn extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div className="songListColumn">
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

export default DisplayAllSongsInPlaylist