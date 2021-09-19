import React from 'react'
import '../../styles/displayAllPlaylists.css';
import { spotifyAPIRequest, spotifyAPIRequestPost, spotifyAPIRequestPut } from '../../helper-functions';
import { SpotifyAPIBase } from '.././helper-components';


class DispalyAllPlaylists extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            playlists: []
        }
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let playlists = (this.state.playlists.length > 1) ? this.displayPlaylists() : undefined

        return (
            <div id="displayAllPlaylistsContainer">
                {error}
                {playlists}
            </div>
        )
    }
    componentDidMount(){
        this.setUsersPlaylists();
    }
    displayPlaylists(){
        return this.state.playlists.map((elm, ind, arr) => {
            return (<PlaylistContainer playlistName={elm.name} imageSrc={(elm.images[0] ? elm.images[0].url : '')} clickEvent={this.props.playlistClickEvent} playlistId={elm.id} key={elm.id}/>)
        })
    }
    async setUsersPlaylists(){
      try{
        let next = 'https://api.spotify.com/v1/me/playlists?limit=50';
        let playlists = [];
        let tempPlaylists = [];
          while(next != null){
            let response = await spotifyAPIRequest(`${next}`, this.props.accessToken);
            response = JSON.parse(response);
          //  console.log(response);
            tempPlaylists = response.items;
            playlists = playlists.concat(tempPlaylists);
            next = response.next;
          }
          this.setState({playlists : playlists});
      }catch(err){
          this.handleResponseForErrors(err);
          console.log(err);
      }
    }
}

    // class that holds the playlists img and name
    class PlaylistContainer extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div className="playlistContainer" playlistid={this.props.playlistId} playlistimagesrc={this.props.imageSrc} playlistname={this.props.playlistName} onClickCapture={this.props.clickEvent || undefined}>
                    <img src={this.props.imageSrc}></img>
                    <p>{this.props.playlistName}</p>
                </div>
            )
        }
    }

export default DispalyAllPlaylists