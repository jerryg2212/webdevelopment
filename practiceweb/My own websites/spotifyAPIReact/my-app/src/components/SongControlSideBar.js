import React from 'react';
import { spotifyAPIRequest, spotifyAPIRequestPost, spotifyAPIRequestPut, addSongToSongBankRequest } from '../helper-functions';
import playPauseSongIconPNG from '../icons/pause-play-button.png';
import {SpotifyAPIBase, SpotifyAPIBaseComposition} from '../components/helper-components.js';
import searchSongResponsesBoxComponent from './searchSongsResponsesBoxComponent.js';
import SearchSongResponsesBoxComponent from './searchSongsResponsesBoxComponent.js';
let accessTokenContext = React.createContext('');
// component that is the sidebar where you can change the song
// properties
    // accessToken
    // getNewAccessToken
class SongControlSideBar extends React.Component{
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
        let SearchSongControlComponent = SpotifyAPIBaseComposition(SearchSongControl)
        let PlayPauseSongIconComponent = SpotifyAPIBaseComposition(PlayPauseSongIcon);
        let CurrentlyPlayingSongInformationComponent = SpotifyAPIBaseComposition(CurrentlyPlayingSongInformation);
        return (
            <accessTokenContext.Provider value={this.props.accessToken}>
                <div id="playSongContainer">
                <h1>Search Song</h1>
                <SearchSongControlComponent getNewAccessToken={this.props.getNewAccessToken} accessToken={this.props.accessToken}/>
                <ActiveDeviceDisplayContainer activeDevice={this.state.activeDevice} linkToPage={this.state.linkToPage}/>
                <h1 id="currentlyPlayingSongHeader">Currently Playing Song</h1>
                <PlayPauseSongIconComponent getNewAccessToken={this.props.getNewAccessToken} accessToken={this.props.accessToken} />
                <UpdateCurrentlyPlayingSongInformationButton clickEventHandler={this.refreshInformationButtonClickEventHandler}/>
                <CurrentlyPlayingSongInformationComponent getNewAccessToken={this.props.getNewAccessToken} accessToken={this.props.accessToken} current={currentlyPlayingSongInformation}/>
            </div>
            </accessTokenContext.Provider>
        )
    }
    componentDidMount(){
        this.getLinkToPage();
        this.setActiveDevice();
        this.saveCurrentlyPlayingSongInformation();
    }
    refreshInformationButtonClickEvent(ev){
        this.getLinkToPage();
        this.setActiveDevice();
        this.saveCurrentlyPlayingSongInformation();
    }
    async getLinkToPage(){
        try{
            this.setState({
                linkToPage : await this.props.getLinkToUsersPage()
        })
       }catch(err){
            console.log(err);
       }
    }
    async setActiveDevice(){
        try{
            let activeDevice = await this.props.getUsersActiveDevice();
            this.setState({activeDevice : activeDevice.name})
        }catch(err){
            console.log(err);
        }
    }
    async saveCurrentlyPlayingSongInformation(){
        try{
            let response = await this.props.getUsersCurrentlyPlayingTrack();
            if(response == undefined) {
                this.setState({isCurrentlyPlayingSong : false});
            }
            else{
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
            console.log(err);
        }
        
    }
}   
    // holds UI where user searches song and adds it to queue and can skip to the next track
    class SearchSongControl extends React.Component{
        constructor(props){
            super(props);
            this.state = {songInput : '', searchedSongs : [],  activeSongUri: undefined, activeSongId : undefined}
            this.searchSongOnInputHandler = this.searchSongOnInput.bind(this);
            this.searchSongResponseListItemClickEventHandler = this.searchSongResponseListItemClickEvent.bind(this);
            this.onFocusSearchSongEventHandler = this.onFocusSearchSongEvent.bind(this);
        }
        render(){
            let QueueAndNextTrackButtonsContainerComponent = SpotifyAPIBaseComposition(QueueAndNextTrackButtonsContainer)
            let songResponsesBox = (this.state.searchedSongs.length > 0) ? <SearchSongResponsesBoxComponent searchedSongs={this.state.searchedSongs} searchSongResponseListItemClickEvent={this.searchSongResponseListItemClickEventHandler} positionElement={document.getElementById('searchSongToPlayInput')} /> : undefined;
            // let songResponsesBox = (this.state.searchedSongs.length > 0) ? <SearchSongResponsesBox rootThis={this.props.rootThis} searchedSongs={this.state.searchedSongs} searchSongResponseListItemClickEvent={this.searchSongResponseListItemClickEventHandler} positionElement={document.getElementById('searchSongToPlayInput')}/> : undefined;
                return (
                <div>
                    <SearchSongToPlayInput inputOnInputHandler={this.searchSongOnInputHandler} onFocusSearchSongEventHandler={this.onFocusSearchSongEventHandler} />
                    {songResponsesBox}
                    <QueueAndNextTrackButtonsContainerComponent getNewAccessToken={this.props.getNewAccessToken} accessToken={this.props.accessToken} activeSongUri={this.state.activeSongUri} activeSongId={this.state.activeSongId} />
                </div>
            )
        }
        async searchSongOnInput(ev){
            this.setState({songInput: ev.target.value}, async () => {
                try{
                    // get list of song resoponses from the api
                    let searchedSongsResponse = await this.props.spotifySearchRequest(this.state.songInput, 'track', 5);
                    let searchedSongsList = searchedSongsResponse.tracks.items;
                        let searchedSongs = []
                        // making an array of song information so the response block renders after the new state is set
                        for(let song of searchedSongsList){
                            searchedSongs.push({name: song.name, artist : song.artists[0].name, id : song.id, uri : song.uri});
                        }
                        this.setState({searchedSongs: searchedSongs});
                }catch(err){
                    console.log(err);
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
        class QueueAndNextTrackButtonsContainer extends React.Component{
            constructor(props){
                super(props);
                this.queueSongButtonClickEventHandler = this.queueSongButtonClickEvent.bind(this);
                this.nextTrackButtonClickEventHandler = this.nextTrackButtonClickEvent.bind(this);
                this.bankSongButtonClickEventHandler = this.bankSongButtonClickEvent.bind(this);
                this.state = {activateDeviceErrorMessage : false}
            }
            render(){
                return (
                    <div id="queueAndNextTrackButtonsContainer">
                        <button id="queueSongButton" className="primaryButtonStyle" onClick={this.queueSongButtonClickEventHandler}>Queue</button>
                        <button id="nextTrackButton" className="playSongContainerButton" onClick={this.nextTrackButtonClickEventHandler}>Next Track</button>
                        <button id="bankSongButton" className="playSongContainerButton" onClick={this.bankSongButtonClickEventHandler} >Bank Song</button>
                    </div>
                )
            }
            // click event for the queue button
            async queueSongButtonClickEvent(ev){
                // if their is no active song return and do nothing
                if(!this.props.activeSongUri){
                    return
                }
               // console.log(this.props.activeSongUri);
                try{
                    await this.props.addSongToQueue(this.props.activeSongUri);
                    let input = document.getElementById('searchSongToPlayInput');
                    input.value = '';
                    input.focus();
                }catch(err){
                    console.log(err);
                }finally{
                    // get the search song input and remove its value and focus it
                  //  this.setState({activateDeviceErrorMessage: true})
                }
                // else make request to spotify to add the song to the queue
            }
            async nextTrackButtonClickEvent(ev){
                try{
                    await this.props.skipToNextTrack();
                }catch(err){
                }
            }
            // adds the active song to the users song bank
            async bankSongButtonClickEvent(ev){
                // if no active Song Uri return
                if(!this.props.activeSongId) return
                try{
                    let songBank = await this.props.addSongsToSongBank(JSON.stringify({songs : [this.props.activeSongId]}));
                }catch(err){
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
    class ActiveDeviceDisplayContainer extends React.Component{
        constructor(props){
            super(props);
        }
        render() {
            return (
                <div id="activeDeviceDisplayContainer">
                    <p><span className="currentlyPlayingSongDescriptionTitle">Active Device -  <span className="italics lightblueFont"><a href={`${this.props.linkToPage}`} >{this.props.activeDevice}</a></span></span></p>
                </div>
            )
        }
    }
    class PlayPauseSongIcon extends React.Component{
        constructor(props){
            super(props);
            this.playPauseSongIconClickEventHandler = this.playPauseSongIconClickEvent.bind(this);
        }
        render(){
          return  (
              <React.Fragment>
                  <img id="playPauseSongIcon" src={playPauseSongIconPNG} onClick={this.playPauseSongIconClickEventHandler}></img>
              </React.Fragment>
          )
        }
        async playPauseSongIconClickEvent(ev){
            let isPlaying = false;
            try{
                let isPlayingResponse = await this.props.isCurrentlyPlayingSong();
                isPlaying = isPlayingResponse.isPlaying;

            }catch(err){
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
                await this.props.resumeCurrentlyPlayingSong();
                this.setState({isPlaying : true});
                
            }catch(err){
            }
        }
        async pauseSong(){
            try{
                await this.props.pauseCurrentlyPlayingSong();
                    this.setState({isPlaying : false});
                
            }catch(err){
            }
        }

    }
    class UpdateCurrentlyPlayingSongInformationButton extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return    <button className="playSongContainerButton" id="updateCurrentlyPlayingSongInformationButton" onClick={this.props.clickEventHandler}>Update Information</button>
        }
    }
    class CurrentlyPlayingSongInformation extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            let body = (this.props.current.isCurrentlyPlayingSong) ? (<div id="currentlyPlayingSongInformationContainer">
                <img id="currentlyPlayingSongAlbumCover" src={this.props.current.albumCoverSrc}></img>
                <div id="currentlyPlayingSongFactsContainer">
                    <p><span className="currentlyPlayingSongDescription">Title:  </span>{this.props.current.currentlyPlayingSongTitle}</p>
                    <p><span className="currentlyPlayingSongDescription">{(this.props.current.artists.length > 1) ? 'Artists:  ' : 'Artist:  '}</span>{this.displayArtists()}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Album Name:  </span>{this.props.current.albumName}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Release Date:  </span>{this.props.current.releaseDate}</p>
                    <p><span className="currentlyPlayingSongDescriptionTitle">Song Popularity:  </span>{this.props.current.songPopularity}</p>
                </div>
            </div>) : <div></div>
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
    }

export default SpotifyAPIBaseComposition(SongControlSideBar);