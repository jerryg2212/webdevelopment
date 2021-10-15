import React from 'react';
import { spotifyAPIRequest, spotifyAPIRequestPost, spotifyAPIRequestPut, addSongToSongBankRequest } from '../helper-functions';
import playPauseSongIconPNG from '../icons/pause-play-button.png';
import {SpotifyAPIBase} from '../components/helper-components.js';
import searchSongResponsesBoxComponent from './searchSongsResponsesBoxComponent.js';
import SearchSongResponsesBoxComponent from './searchSongsResponsesBoxComponent.js';
let accessTokenContext = React.createContext('');
class SongControlSideBar extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            activeDevice : 'Activate',
            linkToPage : '',
            isCurrentlyPlayingSong : false,
            currentlyPlayingSongTitle : '',
            artists : [],
            albumName : '',
            releaseDate : '',
            albumCoverSrc : '',
            songPopularity : ''
        }
        this.refreshInformationButtonClickEventHandler = this.refreshInformationButtonClickEvent.bind(this);
    }
    render(){
        let {activeDevice, linkToPage, ...currentlyPlayingSongInformation} = this.state;
        let error = this.returnCorrectErrorMessage();
        return (
            <accessTokenContext.Provider value={this.props.accessToken}>
                <div id="playSongContainer">
                    {error}
                <h1>Search Song</h1>
                <SearchSongControl rootThis={this.props.rootThis}/>
                <ActiveDeviceDisplayContainer rootThis={this.props.rootThis} activeDevice={this.state.activeDevice} linkToPage={this.state.linkToPage}/>
                <h1 id="currentlyPlayingSongHeader">Currently Playing Song</h1>
                <PlayPauseSongIcon rootThis={this.props.rootThis} />
                <UpdateCurrentlyPlayingSongInformationButton rootThis={this.props.rootThis} clickEventHandler={this.refreshInformationButtonClickEventHandler}/>
                <CurrentlyPlayingSongInformation rootThis={this.props.rootThis} current={currentlyPlayingSongInformation}/>
            </div>
            </accessTokenContext.Provider>
        )
    }
    componentDidMount(){
        this.getLinkToPage();
        this.setActiveDevice();
        this.saveCurrentlyPlayingSongInformation();
       // this.setUserId(this.props.accessToken);
    }
    refreshInformationButtonClickEvent(ev){
        this.getLinkToPage();
        this.setActiveDevice();
        this.saveCurrentlyPlayingSongInformation();
    }
    async getLinkToPage(){
        try{
            let linkToPageResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', this.props.accessToken);
            let linkToPage = JSON.parse(linkToPageResponse);
                this.setState({
                    linkToPage : linkToPage.external_urls.spotify
            })
       }catch(err){
        this.handleResponseForErrors(err);
            //window.location = '/';
       }
    }
    async setActiveDevice(){
        try{
            let activeDeviceResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me/player/devices', this.props.accessToken);
            let activeDevice = JSON.parse(activeDeviceResponse);
                for(let device of activeDevice.devices){
                    if(device.is_active){
                        this.setState({activeDevice : device.name})
                    }
                }
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
    }
    async saveCurrentlyPlayingSongInformation(){
        try{
            let response = await spotifyAPIRequest('https://api.spotify.com/v1/me/player/currently-playing', this.props.accessToken);
            if(response == '') {
                this.setState({isCurrentlyPlayingSong : false});
            }
            else{
                response = JSON.parse(response);
                this.setState({
                    isCurrentlyPlayingSong : response.is_playing,
                    currentlyPlayingSongTitle : response.item.name,
                    artists : response.item.artists,
                    albumName : response.item.album.name,
                    releaseDate : response.item.album.release_date,
                    albumCoverSrc : response.item.album.images[1].url,
                    songPopularity : response.item.popularity
                    
                })
            }
        }catch(err){
            this.handleResponseForErrors(err);
            console.log(err);
        }
        
    }
}   
    // holds UI where user searches song and adds it to queue and can skip to the next track
    class SearchSongControl extends SpotifyAPIBase{
        constructor(props){
            super(props);
            this.state = {songInput : '', searchedSongs : [],  activeSongUri: undefined, activeSongId : undefined}
            this.searchSongOnInputHandler = this.searchSongOnInput.bind(this);
            this.searchSongResponseListItemClickEventHandler = this.searchSongResponseListItemClickEvent.bind(this);
            this.onFocusSearchSongEventHandler = this.onFocusSearchSongEvent.bind(this);
        }
        render(){
            let error = this.returnCorrectErrorMessage();
            let songResponsesBox = (this.state.searchedSongs.length > 0) ? <SearchSongResponsesBoxComponent searchedSongs={this.state.searchedSongs} searchSongResponseListItemClickEvent={this.searchSongResponseListItemClickEventHandler} positionElement={document.getElementById('searchSongToPlayInput')} /> : undefined;
            // let songResponsesBox = (this.state.searchedSongs.length > 0) ? <SearchSongResponsesBox rootThis={this.props.rootThis} searchedSongs={this.state.searchedSongs} searchSongResponseListItemClickEvent={this.searchSongResponseListItemClickEventHandler} positionElement={document.getElementById('searchSongToPlayInput')}/> : undefined;
                return (
                <div>
                    {error}
                    <SearchSongToPlayInput rootThis={this.props.rootThis} inputOnInputHandler={this.searchSongOnInputHandler} onFocusSearchSongEventHandler={this.onFocusSearchSongEventHandler} />
                    {songResponsesBox}
                    <QueueAndNextTrackButtonsContainer rootThis={this.props.rootThis} activeSongUri={this.state.activeSongUri} activeSongId={this.state.activeSongId} />
                </div>
            )
        }
        async searchSongOnInput(ev){
            this.setState({songInput: ev.target.value}, async () => {
                try{
                    // get list of song resoponses from the api
                    let searchedSongsResponse = await spotifyAPIRequest(`https://api.spotify.com/v1/search?q=${this.state.songInput}&type=track&limit=5`, this.context);
                    let searchedSongsList = JSON.parse(searchedSongsResponse)
                        searchedSongsList = searchedSongsList.tracks.items;
                        let searchedSongs = []
                        // making an array of song information so the response block renders after the new state is set
                        for(let song of searchedSongsList){
                            searchedSongs.push({name: song.name, artist : song.artists[0].name, id : song.id, uri : song.uri});
                        }
                        this.setState({searchedSongs: searchedSongs});
                }catch(err){
                    this.handleResponseForErrors(err);
                    this.setState({searchedSongs: []});
                }
            });
        }
        // click event for the song response list item
        searchSongResponseListItemClickEvent(songName, artistName, songUri, songId, ev){
            // getting the input element and changing its value
            document.getElementById('searchSongToPlayInput').value = `${songName} - ${artistName}`;
            // setting the state so the search resonse box does not render and saves the activeSongId
            this.setState({searchedSongs : [], activeSongUri : songUri, activeSongId : songId});
        }
        // on focus event for the input that removes the value of the active song state
        onFocusSearchSongEvent(ev){
            this.setState({activeSongUri : undefined});
        }
        
        static contextType = accessTokenContext;
    }
        // returns text input that is used for user to search for a song to play
        class SearchSongToPlayInput extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <input id="searchSongToPlayInput" type="text" onInput={this.props.inputOnInputHandler} onFocus={this.props.onFocusSearchSongEventHandler}></input>
                )
            }
        }
        // containe that holds the queue song and next track button
        class QueueAndNextTrackButtonsContainer extends SpotifyAPIBase{
            constructor(props){
                super(props);
                this.queueSongButtonClickEventHandler = this.queueSongButtonClickEvent.bind(this);
                this.nextTrackButtonClickEventHandler = this.nextTrackButtonClickEvent.bind(this);
                this.bankSongButtonClickEventHandler = this.bankSongButtonClickEvent.bind(this);
                this.state = {activateDeviceErrorMessage : false}
            }
            render(){
                let errorMessage = this.returnCorrectErrorMessage();
                return (
                    <div id="queueAndNextTrackButtonsContainer">
                        {errorMessage}
                        <button id="queueSongButton" className="primaryButtonStyle" onClick={this.queueSongButtonClickEventHandler}>Queue</button>
                        <button id="nextTrackButton" className="playSongContainerButton" onClick={this.nextTrackButtonClickEventHandler}>Next Track</button>
                        <button id="bankSongButton" className="playSongContainerButton" onClick={this.bankSongButtonClickEventHandler} >Bank Song</button>
                    </div>
                )
            }
            async componentDidMount(){
                try{
                    await this.setUserId(this.context);
                }catch(err){
                    this.handleResponseForErrors(err);
                }
            }
            // click event for the queue button
            async queueSongButtonClickEvent(ev){
                // if their is no active song return and do nothing
                if(!this.props.activeSongUri){
                    return
                }
               // console.log(this.props.activeSongUri);
                try{
                    console.log(`queuer song uri ${this.props.activeSongUri}`);
                    let response = await spotifyAPIRequestPost(`https://api.spotify.com/v1/me/player/queue?uri=${this.props.activeSongUri}`, this.context);
                }catch(err){
                    this.handleResponseForErrors(err);
                    console.log(err);
                }finally{
                    // get the search song input and remove its value and focus it
                     let input = document.getElementById('searchSongToPlayInput');
                     input.value = '';
                     input.focus();
                  //  this.setState({activateDeviceErrorMessage: true})
                }
                // else make request to spotify to add the song to the queue
            }
            async nextTrackButtonClickEvent(ev){
                try{
                    let response = await spotifyAPIRequestPost('https://api.spotify.com/v1/me/player/next', this.context);
                }catch(err){
                    this.handleResponseForErrors(err);
                    console.log(err);
                }
            }
            // adds the active song to the users song bank
            async bankSongButtonClickEvent(ev){
                // if no active Song Uri return
                if(!this.props.activeSongId) return
                try{
                    let songBank = await addSongToSongBankRequest(this.userId, this.props.activeSongId);
                }catch(err){
                    this.handleResponseForErrors(err);
                    console.log(err);
                }finally{
                    // get the search song input and remove its value and focus it
                     let input = document.getElementById('searchSongToPlayInput');
                     input.value = '';
                     input.focus();
                }
            }
            static contextType = accessTokenContext
        }
    // container that holds the information about the active device
    class ActiveDeviceDisplayContainer extends SpotifyAPIBase{
        constructor(props){
            super(props);
        }
        render() {
            let error = this.returnCorrectErrorMessage();
            return (
                <div id="activeDeviceDisplayContainer">
                    {error}
                    <p><span className="currentlyPlayingSongDescriptionTitle">Active Device -  <span className="italics lightblueFont"><a href={`${this.props.linkToPage}`} >{this.props.activeDevice}</a></span></span></p>
                </div>
            )
        }
    }
    class PlayPauseSongIcon extends SpotifyAPIBase{
        constructor(props){
            super(props);
            this.playPauseSongIconClickEventHandler = this.playPauseSongIconClickEvent.bind(this);
        }
        render(){
            let error = this.returnCorrectErrorMessage();
          return  (
              <React.Fragment>
                  {error}
                  <img id="playPauseSongIcon" src={playPauseSongIconPNG} onClick={this.playPauseSongIconClickEventHandler}></img>
              </React.Fragment>
          )
        }
        async playPauseSongIconClickEvent(ev){
            let isPlaying = false;
            try{
                let isPlayingResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me/player', this.context);
                isPlayingResponse = JSON.parse(isPlayingResponse);
                isPlaying = isPlayingResponse.is_playing;
            }catch(err){
                this.handleResponseForErrors(err);
            }
            // pause
            if(isPlaying){
                this.pauseSong();
            }
            // play
            else{
                this.resumeSong();
            }
        }
        async resumeSong(){
            try{
                let resumeSongResponse = await spotifyAPIRequestPut('https://api.spotify.com/v1/me/player/play', this.context);
                    this.setState({isPlaying : true});
                
            }catch(err){
                this.handleResponseForErrors(err);
            }
        }
        async pauseSong(){
            try{
                let pauseSongResponse = await spotifyAPIRequestPut('https://api.spotify.com/v1/me/player/pause', this.context);
                    this.setState({isPlaying : false});
                
            }catch(err){
                this.handleResponseForErrors(err);
            }
        }
        static contextType = accessTokenContext;

    }
    class UpdateCurrentlyPlayingSongInformationButton extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return    <button className="playSongContainerButton" id="updateCurrentlyPlayingSongInformationButton" onClick={this.props.clickEventHandler}>Update Information</button>
        }
    }
    class CurrentlyPlayingSongInformation extends SpotifyAPIBase{
        constructor(props){
            super(props);
        }
        render(){
            let error = this.returnCorrectErrorMessage();
            let body = (this.props.current.isCurrentlyPlayingSong) ? (<div id="currentlyPlayingSongInformationContainer">
                {error}
                <img id="currentlyPlayingSongAlbumCover" src={this.props.current.albumCoverSrc}></img>
                <div id="currentlyPlayingSongFactsContainer">
                    <p><span className="currentlyPlayingSongDescription">Title:  </span>{this.props.current.currentlyPlayingSongTitle}</p>
                    <p><span className="currentlyPlayingSongDescription">{(this.props.current.artists.length > 1) ? 'Artists:  ' : 'Artist:  '}</span>{this.displayArtists()}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Album Name:  </span>{this.props.current.albumName}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Release Date:  </span>{this.props.current.releaseDate}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Song Popularity:  </span>{this.props.current.songPopularity}</p>
                </div>
            </div>) : <div>{error}</div>
            return body
        }
        // returns text bases on the artists
        displayArtists(){
            function displayMultipleArtists(){
                let result = `${this.props.current.artists[0].name}`;
                for(let i = 1; i < this.props.current.artists.length; i++){
                    result += `, ${this.props.current.artists[i].name}`;
                }
                return result
            }
            return (!this.props.current.artists.length > 1) ? `${this.props.current.artists[0].name}` : displayMultipleArtists.apply(this);
        }
       // static contextType = accessTokenContext
    }

export default SongControlSideBar;