import React, { useEffect, useState } from 'react';
import  ReactDOM, { render }  from 'react-dom';
import axios from 'axios';
import exitIcon from '../icons/exit.svg';
import { spotifyAPIRequest, spotifyAPIRequestPost, transitionResponseSongsToFormat, addSongsToSongBankRequest, removeDuplicateSongs, commaSeperatedItemsUrl, getSongsFromSongBankRequest, getSongsRequestUrl, deleteSongsFromSongBankRequest, spotifyAPIRequestDelete, deleteSongsRequestBody, spotifyAPIRequestPut } from '../helper-functions';
//import { response } from 'express';

// base component for the spotify api that provides functionality for all components
class SpotifyAPIBase extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activateDeviceErrorMessage : false,
            mustHavePremiumAccount : false,
            cannotAccessSongBank : false
                    }
        this.userId = undefined;
    }
    // given a response it handles errors and sets correct error messages and returns true if there is an error
    handleResponseForErrors(response){
        if(this.checkResponseForError(response)){
            this.activateCorrectErrorMessage(response);
        }
        return this.checkResponseForError(response);
    }
    returnCorrectErrorMessage(){
        let error = undefined;
        if(this.state.activateDeviceErrorMessage){
            error = this.activateDeviceErrorMessage();
        }
        if(this.state.mustHavePremiumAccount){
            error = this.mustHavePremiumAccount();
        }
        if(this.state.cannotAccessSongBank){
            error = this.cannotAccessSongBank();
        }
        return error

    }
    activateDeviceErrorMessage(){
        return <ActivateDeviceErrorMessage thisOfParent={this} />
    }
    mustHavePremiumAccount(){
        return <MustHavePremiumAccount thisOfParent={this} />
    }
    cannotAccessSongBank(){
        return <CannotAccessSongBank thisOfParent={this} />
    }
    // given the response from the server it will check for errors and return true if their is one
    checkResponseForError(response){
        if(response.status == undefined){return false}
        if(response.status > 399){return true}
        return false
    }
    async activateCorrectErrorMessage(response){
        if(response.status == 401){
            // need a new access token
            let accessTokenResponse = await axios.post('/refreshToken', {refreshToken : this.props.rootThis.state.refresh_token});
            this.props.rootThis.setState({access_token : accessTokenResponse.data.access_token});
        }
        if(response.status == 403){
            // needs a premium account
            this.setState({mustHavePremiumAccount : true})
        }
        if(response.status == 404){
            // user needs an active device
            this.setState({activateDeviceErrorMessage : true})
        }
        if(response.status == 410){
            // cannot access the song bank
            this.setState({cannotAccessSongBank : true});
        }
    }
    // returns a promise so the component that calls this can make sure it waits to use the access token
    // function given an access token sets the users id
    async setUserId(accessToken){
        return new Promise( async (resolve, reject) => {
            try{
                let userIdResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', accessToken);
                this.userId = JSON.parse(userIdResponse).id;
                resolve();
            }catch(err){
                this.handleResponseForErrors(err);
                reject(err);
            }
        })
    }
}
// general error message component that displays in the middle of screen with message
class ErrorMessage extends React.Component{
    constructor(props){
        super(props);
        this.imgClickEventHandler = this.imgClickEvent.bind(this);
        this.bodyClickEventHandler = this.bodyClickEvent.bind(this);
    }
    render(){
        return ReactDOM.createPortal(<div id="popupErrorMessageContainer" style={{top: `${window.pageYOffset + 100}px`, left : `${window.screen.width / 2 -200}px`}}>
        <img src={exitIcon} onClick={this.imgClickEventHandler}></img>
        <p>{this.props.message}</p>
        </div>, document.body);
        /*return (
            <div id="popupErrorMessageContainer" style={{top: `${window.pageYOffset + 100}px`, left : `${window.screen.width / 2 -200}px`}}>
            <img src={exitIcon} onClick={this.imgClickEventHandler}></img>
            <p>{this.props.message}</p>
            </div>
        )*/
    }
    imgClickEvent(ev){
        this.props.thisOfParent.setState({[this.props.error] : false});
       // document.getElementById('popupErrorMessageContainer').remove();
    }
    componentDidMount(){
        document.body.addEventListener('click', this.bodyClickEventHandler, false);
    }
    componentWillUnmount(){
        document.body.removeEventListener('click', this.bodyClickEventHandler, false);
    }
    bodyClickEvent(ev){
        ev.stopPropagation();
        let popupContainer = document.getElementById('popupErrorMessageContainer');
        let popupContainerPosition = popupContainer.getBoundingClientRect();
        if(ev.clientX > popupContainerPosition.left && ev.clientX < popupContainerPosition.right && ev.clientY > popupContainerPosition.top && ev.clientY < popupContainerPosition.bottom){
            return
        }
        this.props.thisOfParent.setState({[this.props.error]: false});
    }
}

    // error message that is a subclass of the general error message
    // it comes up for when user needs to activate a device
        class ActivateDeviceErrorMessage extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <ErrorMessage message="You Must Activate a Device To Use This Functionality" id={this.props.id} thisOfParent={this.props.thisOfParent} error={'activateDeviceErrorMessage'}></ErrorMessage>
                )
            }
        }
    // error message that is a subclass of the general error message
    // it comes up fore when the user does not have a premium account
        class MustHavePremiumAccount extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <ErrorMessage message="You Must Have a Premium Account To Use This Functionality" thisOfParent={this.props.thisOfParent} error="mustHavePremiumAccount"/>
                )
            }
        }

    // error message that is a subclass of the general error message
    // it comes up for when their is an error with the song bank
        class CannotAccessSongBank extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <ErrorMessage message="There was an error accessing the Song Bank" thisOfParent={this.props.thisOfParent} error="cannotAccessSongBank" />
                )
            }
        }
    
    export {
        SpotifyAPIBase,
        ActivateDeviceErrorMessage,
        SpotifyAPIBaseComposition
    }




// spotify base component like the one above however this one user composition instead of inheritance
// properties
    // accessToken
    // getNewAccessToken = function that lets the root get a new access token
function SpotifyAPIBaseComposition(Component, properties){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                activateDeviceErrorMessage : false,
                mustHavePremiumAccountErrorMessage : false,
                cannotAccessSongBankErrorMessage : false,
                userId : undefined
            }
        }
        async componentDidMount(){
            try{
                await this.setUserId();
               /* let userIdResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', this.props.accessToken);
                this.setState({userId : JSON.parse(userIdResponse).id});*/
            }catch(err){
                console.log(err);
                this.handleResponseForErrors(err);
            }
        }
        render(){
            let error = this.returnCorrectErrorMessage();
            return(
                <>
                {error}
                <Component {...this.props} {...properties} allUsersPlaylists={this.allUsersPlaylists.bind(this)} getPlaylistTracks={this.getPlaylistTracks.bind(this)} addSongsToSongBank={this.addSongsToSongBank.bind(this)} addSongsToPlaylist={this.addSongsToPlaylist.bind(this)} createNewPlaylist={this.createNewPlaylist.bind(this)} getSongIdsFromSongBank={this.getSongIdsFromSongBank.bind(this)} getSongsFromIds={this.getSongsFromIds.bind(this)} deleteSongsFromSongBank={this.deleteSongsFromSongBank.bind(this)} deleteSongsFromPlaylist={this.deleteSongsFromPlaylist.bind(this)} getLinkToUsersPage={this.getLinkToUsersPage.bind(this)} getUsersActiveDevice={this.getUsersActiveDevice.bind(this)} getUsersCurrentlyPlayingTrack={this.getUsersCurrentlyPlayingTrack.bind(this)} spotifySearchRequest={this.spotifySearchRequest.bind(this)} addSongToQueue={this.addSongToQueue.bind(this)} skipToNextTrack={this.skipToNextTrack.bind(this)} isCurrentlyPlayingSong={this.isCurrentlyPlayingSong.bind(this)} pauseCurrentlyPlayingSong={this.pauseCurrentlyPlayingSong.bind(this)} resumeCurrentlyPlayingSong={this.resumeCurrentlyPlayingSong.bind(this)} />
                </>
            )
        }
        // Error handleing 
            // given a response it handles errors and sets correct error messages and returns true if there is an error
            // properties
                // response = the error returned
            handleResponseForErrors(response){
                if(this.checkResponseForError(response)){
                    this.activateCorrectErrorMessage(response);
                }
                return this.checkResponseForError(response);
            }
            returnCorrectErrorMessage(){
                let error = undefined;
                if(this.state.activateDeviceErrorMessage){
                    error = this.activateDeviceErrorMessage();
                }
                if(this.state.mustHavePremiumAccount){
                    error = this.mustHavePremiumAccount();
                }
                if(this.state.cannotAccessSongBank){
                    error = this.cannotAccessSongBank();
                }
                return error

            }
            activateDeviceErrorMessage(){
                return <ActivateDeviceErrorMessage thisOfParent={this} />
            }
            mustHavePremiumAccount(){
                return <MustHavePremiumAccount thisOfParent={this} />
            }
            cannotAccessSongBank(){
                return <CannotAccessSongBank thisOfParent={this} />
            }
            // given the response from the server it will check for errors and return true if their is one
            checkResponseForError(response){
                if(response.status == undefined){return false}
                if(response.status > 399){return true}
                return false
            }
            async activateCorrectErrorMessage(response){
                if(response.status == 401){
                    // need a new access token
                    if(this.props.getNewAccessToken){
                            await this.props.getNewAccessToken();
                       
                    }else{
                        let accessTokenResponse = await axios.post('/refreshToken', {refreshToken : this.props.refreshToken});
                        this.props.rootThis.setState({access_token : accessTokenResponse.data.access_token});
                    }
                }
                if(response.status == 403){
                    // needs a premium account
                    this.setState({mustHavePremiumAccount : true})
                }
                if(response.status == 404){
                    console.log(`this is the response status ${response.status}`);
                    // user needs an active device
                    this.setState({activateDeviceErrorMessage : true})
                }
                if(response.status == 410){
                    // cannot access the song bank
                    this.setState({cannotAccessSongBank : true});
                }
            }



        // Spotify API Requests
            
            // Playlist Requests

                // returns an array of the users playlists
                async allUsersPlaylists(){
                    try{
                        let url = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0';
                        let playlists = [];
                        while(url){
                            let playlistsResponse = await spotifyAPIRequest(url, this.props.accessToken);
                            playlistsResponse = JSON.parse(playlistsResponse);
                            playlists = playlists.concat(playlistsResponse.items);
                            url = playlistsResponse.next;
                        }
                        return playlists;
                    }catch(err){
                        this.handleResponseForErrors(err);
                        console.log(err);
                        return []
                    }
                }
                // returns all the tracks in the users playlist
                // parameters
                    // id = the id of the playlist
                async getPlaylistTracks(id){
                    return new Promise(async (resolve, reject) => {
                        var songs = [];
                        try{
                            if(this.state.userId === undefined){reject("userId is undefined");}
                            var url = `https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`;
                            while(url){
                                let songsResponse = await spotifyAPIRequest(url, this.props.accessToken);
                                songsResponse = JSON.parse(songsResponse);
                                songs = songs.concat(songsResponse.items);
                                url = songsResponse.next;  
                            }
                            songs = transitionResponseSongsToFormat(songs);
                            songs = removeDuplicateSongs(songs);
                            resolve(songs);
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }
                // adds songs to playlist
                // precondition = their are no duplicate songs
                // parameters
                    // playlistId = the id of the playlist you want to add the songs to
                    // songs = array of the songs user wants to add to the playlist
                async addSongsToPlaylist(playlistId, songs){
                    return new Promise(async (resolve, reject) => {
                        try{
                            var requestableSongs = songs;
                            while(requestableSongs.length > 0){
                                let url = commaSeperatedItemsUrl(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=`)(requestableSongs.splice(0, 100));
                                await spotifyAPIRequestPost(url, this.props.accessToken);
                            }
                            resolve();
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                            reject(err);
                        }
                    })
                }
                // delete songs from playlist
                // parameters
                    // playlistId = the id of the playlist the user wants to delete songs form
                    // deleteableSongs = array of song uris to be deleted
                deleteSongsFromPlaylist(playlistId, deleteableSongs){
                    return new Promise(async (resolve, reject) => {
                        try{
                            while(deleteableSongs.length != 0){
                                let body = deleteSongsRequestBody(deleteableSongs.splice(0, 99));
                                let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
                                await spotifyAPIRequestDelete(url, this.props.accessToken, body);
                            }
                            resolve();
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }
                // creates a new playlist
                // parameters
                    // requestBody = body with details on the playlist sent to make the request
                createNewPlaylist(requestBody){
                    return new Promise(async (resolve, reject) => {
                        let url = `https://api.spotify.com/v1/users/${this.state.userId}/playlists`;
                        try{
                            let response = await spotifyAPIRequestPost(url, this.props.accessToken, requestBody);
                            resolve(response);
                        }catch(err){
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }
            
            // User Profile Information Requests
                // returns link to the users Spotify Page
                getLinkToUsersPage(){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let linkToPageResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', this.props.accessToken);
                            let linkToPage = JSON.parse(linkToPageResponse);
                            resolve(linkToPage.external_urls.spotify);
                       }catch(err){
                        this.handleResponseForErrors(err);
                        console.log(err);
                        reject(err);
                       }
                    })
                }
                // gets a list of users devices
                getUsersDevices(){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let activeDeviceResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me/player/devices', this.props.accessToken);
                            let activeDevice = JSON.parse(activeDeviceResponse);
                            resolve(activeDevice.devices);
                        }catch(err){
                            console.log(err);
                            reject(err);
                        }
                    })
                }
                    // returns the users active device
                    getUsersActiveDevice(){
                        return new Promise(async (resolve, reject) => {
                            try{
                                let devices = await this.getUsersDevices();
                                for(let device of devices){
                                    if(device.is_active){resolve(device);}
                                }
                                reject("no active device");
                            }catch(err){
                                this.handleResponseForErrors(err);
                                console.log(err);
                                reject(err);
                            }
                        })
                    }
                // returns the users currently playing track
                // returns a track object
                getUsersCurrentlyPlayingTrack(){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let response = await spotifyAPIRequest('https://api.spotify.com/v1/me/player/currently-playing', this.props.accessToken);
                            if(response == '') {
                                resolve(undefined);
                            }
                            else{
                                response = JSON.parse(response);
                                resolve(response);
                            }
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                        }
                    })
                }
            
            // Random Requests
                
                // returns array of songs 
                // parameters
                    // songIds = array of songIds the user wants to get songs from
                async getSongsFromIds(songIds){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let songs = [];
                            while(songIds.length != 0){
                                let maxLengthRequest = Math.min(songIds.length, 50);
                                let url = getSongsRequestUrl(songIds.splice(0, maxLengthRequest));
                                let songsResponse = await spotifyAPIRequest(url, this.props.accessToken);
                                songsResponse = JSON.parse(songsResponse);
                                songs = songs.concat(songsResponse.tracks);
                            }
                            resolve(songs);
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }
                // users search string to make a search request 
                // returns a tracks object
                // parameters
                    // input - the input string the user wants to search for
                    // type - the type of the response objects the user is searching for
                    // limit - the amount of items returned
                spotifySearchRequest(input, type = 'track', limit = 5){
                    return new Promise(async (resolve, reject) => {
                        try{
                            // get list of song resoponses from the api
                            let searchedSongsResponse = await spotifyAPIRequest(`https://api.spotify.com/v1/search?q=${input}&type=${type}&limit=${limit}`, this.props.accessToken);
                            let searchedSongsList = JSON.parse(searchedSongsResponse);
                            resolve(searchedSongsList);
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                            reject(err);
                        }
                    })
                }

                // returns promise
                // resolve = userId was set
                // reject means an error occured
                async setUserId(){
                    return new Promise( async (resolve, reject) => {
                        try{
                            if(this.state.userId != undefined){console.log('user id already set');resolve('userId already set');}
                            let userIdResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', this.props.accessToken);
                            this.setState({userId : JSON.parse(userIdResponse).id}, () => {resolve()});
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                            reject(err);
                        }
                    })
                }

                // adds song to queue
                // parameters
                    // songUri = the uri of the song to add to the queue
                async addSongToQueue(songUri){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let response = await spotifyAPIRequestPost(`https://api.spotify.com/v1/me/player/queue?uri=${songUri}`, this.props.accessToken);
                            resolve(response);
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }
                
                // skips to the next track
                async skipToNextTrack(){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let response = await spotifyAPIRequestPost('https://api.spotify.com/v1/me/player/next', this.props.accessToken);
                            resolve(response);
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }

                // return an object that states if their is a song currently playing or not
                // returns
                    // {isPlaying : boolean}
                async isCurrentlyPlayingSong(){
                    return new Promise(async (resolve, reject) => {
                        try{
                            let isPlayingResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me/player', this.props.accessToken);
                            isPlayingResponse = JSON.parse(isPlayingResponse);
                            resolve({isPlaying : isPlayingResponse.is_playing});
                        }catch(err){
                            console.log(err);
                            this.handleResponseForErrors(err);
                            reject(err);
                        }
                    })
                }

                // pauses the users currently playing song
                async pauseCurrentlyPlayingSong(){
                    return new Promise(async (resolve, reject) => {
                        try{
                             await spotifyAPIRequestPut('https://api.spotify.com/v1/me/player/pause', this.props.accessToken);
                             resolve();
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                            reject(err);
                        }
                    })
                }

                // resumes the users current song
                async resumeCurrentlyPlayingSong(){
                    return new Promise(async (resolve, reject) => {
                        try{
                             await spotifyAPIRequestPut('https://api.spotify.com/v1/me/player/play', this.props.accessToken);
                             resolve();
                        }catch(err){
                            this.handleResponseForErrors(err);
                            console.log(err);
                            reject(err);
                        }
                    })
                }




        // requests to our server 
            // makes request to add songs to the song bank
            // parameters
                // songs = {songs : [id1, id2, id3, ... , idN]}
            async addSongsToSongBank(songs){
                return new Promise(async (resolve, reject) => {
                    try{
                        await addSongsToSongBankRequest(this.state.userId, songs);
                        resolve();
                    }catch(err){
                        console.log(err);
                        this.handleResponseForErrors(err);
                        reject(err);
                    }
                })
            }
            // returns an array of the users ids of the songs in their song bank
            async getSongIdsFromSongBank(){
                return new Promise(async (resolve, reject) => {
                    try{
                        await this.setUserId();
                        let songIdsResponse = await getSongsFromSongBankRequest(this.state.userId);
                        let songIds = JSON.parse(songIdsResponse);
                        resolve(songIds);
                    }catch(err){
                        console.log(err);
                        this.handleResponseForErrors(err);
                        reject(err);
                    }
                })
            }
            // makes request to delete the songs from the song bank
            // parameters
                // removeableSongs = an array of the ids of songs that the user wants to remove
            async deleteSongsFromSongBank(removeableSongs){
                return new Promise(async (resolve, reject) => {
                    try{
                        while(removeableSongs.length > 0){
                            await deleteSongsFromSongBankRequest(this.state.userId, removeableSongs.splice(0, 50));
                        }
                        resolve();
                    }catch(err){
                        this.handleResponseForErrors(err);
                        console.log(err);
                        reject('error deleteing songs');
                    }
                })
            }
    }

}