import React from 'react';
import { SpotifyAPIBase } from '../helper-components';
import '../../styles/displaySongBank.css';
import SongListColumn from '../songListColumn';
import DisplaySongBankBody from './songBankOperations/displaySongBankBody';
import AddSongsToSongBankBody from './songBankOperations/addSongsToSongBankBody';
import DeleteSongsFromSongBankBody from './songBankOperations/deleteSongsFromSongBankBody';
import { getSongsFromSongBankRequest } from '../../helper-functions';
import { spotifyAPIRequest } from '../../helper-functions';
const BodyComponents = {
    DisplaySongBankBody : DisplaySongBankBody,
    AddSongsToSongBankBody : AddSongsToSongBankBody,
    DeleteSongsFromSongBankBody : DeleteSongsFromSongBankBody
}



class DisplaySongBank extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            operations : {add : {active : false, title : 'Add Songs', headerTitle : 'Add Songs To Song Bank', display: "AddSongsToSongBankBody", id : 'addSongToSongBankButton'}, delete : {active : false, title : 'Delete Songs', headerTitle : 'Delete Songs From Song Bank', display : "DeleteSongsFromSongBankBody", id : 'removeSongFromSongBankButton'}, display : {active : true, title : 'Display Songs', headerTitle : 'Display Songs In Song Bank', display : "DisplaySongBankBody", id : 'displaySongBankButton'}},
            songsFromSongBank : []
        }
        this.operationButtonClickEventHandler = this.activateCorrectOperation.bind(this);
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        return (
            <>
            {error}
            <div id="displaySongBankHeader">
                <div id="operationsContainer">
                {Object.values(this.state.operations).map((elm, ind, arr) => (
                    <button className={`playSongContainerButton ${(elm.active) ? 'active' : ''}`} id={elm.id} key={elm.title} onClick={this.operationButtonClickEventHandler}>{elm.title}</button>
                ))}
                </div>
                <h1>{this.displayActiveOperationTitle()}</h1>
            </div>
            <div id="displaySongBankBody">
                {this.returnActiveOperationBody()}
            </div>
            </>
        )
    }
    async componentDidMount(){
        await this.setUserId(this.props.accessToken);
        this.setSongsFromSongBank();
    }
    // makes the request to spotify to get the songs information
    async setSongsFromSongBank(){
        // gets the array of song ids from the database
        let songIds = await this.getSongIds();
        let songs = [];
        while(songIds.length != 0){
            let maxLengthRequest = Math.min(songIds.length, 50);
            let url = this.getSongsRequestUrl(songIds.slice(0, maxLengthRequest));
            songIds.splice(0, maxLengthRequest);
            let songsResponse = await spotifyAPIRequest(url, this.props.accessToken);
            songsResponse = JSON.parse(songsResponse);
            console.log(songsResponse);
            console.log(`thst was the resposne`);
            songs = songs.concat(songsResponse.tracks);
        }
        console.log(songs);
        this.setState({songsFromSongBank : songs});
    }
    // makes request to server to get the array of song ids from the database and returns the array of song ids
    async getSongIds(){
        try{
            let songIdsResponse = await getSongsFromSongBankRequest(this.userId);
            let songIds = JSON.parse(songIdsResponse);
            return songIds
        }catch(err){
            console.log(err);
            this.handleResponseForErrors(err);
            return undefined
        }
    }
    // returns correct title for the header based on the active button
    displayActiveOperationTitle(){
        let title = '';
        Object.values(this.state.operations).forEach((elm, ind ,arr) => {
            if(elm.active){
                title = elm.headerTitle;
            }
        })
        return title;
    }
    // given newly active element this function will change the state to represent the newly active state
    activateCorrectOperation(button){
        button = button.target;
        if(button.id == 'addSongToSongBankButton'){
            this.setState({operations : {add : {active : true, title : 'Add Songs', headerTitle : 'Add Songs To Song Bank', display : "AddSongsToSongBankBody", id : 'addSongToSongBankButton'}, delete : {active : false, title : 'Delete Songs', headerTitle : 'Delete Songs From Song Bank', display : "DeleteSongsFromSongBankBody", id : 'removeSongFromSongBankButton'}, display : {active : false, title : 'Display Songs', headerTitle : 'Display Songs In Song Bank', display : "DisplaySongBankBody", id : 'displaySongBankButton'}}});
        }
        if(button.id == 'removeSongFromSongBankButton'){
            this.setState({operations : {add : {active : false, title : 'Add Songs', headerTitle : 'Add Songs To Song Bank', display : "AddSongsToSongBankBody", id : 'addSongToSongBankButton'}, delete : {active : true, title : 'Delete Songs', headerTitle : 'Delete Songs From Song Bank', display : "DeleteSongsFromSongBankBody", id : 'removeSongFromSongBankButton'}, display : {active : false, title : 'Display Songs', headerTitle : 'Display Songs In Song Bank', display : "DisplaySongBankBody", id : 'displaySongBankButton'}}});
        }
        if(button.id == 'displaySongBankButton'){
            this.setState({operations : {add : {active : false, title : 'Add Songs', headerTitle : 'Add Songs To Song Bank', display : "AddSongsToSongBankBody", id : 'addSongToSongBankButton'}, delete : {active : false, title : 'Delete Songs', headerTitle : 'Delete Songs From Song Bank', display : "DeleteSongsFromSongBankBody", id : 'removeSongFromSongBankButton'}, display : {active : true, title : 'Display Songs', headerTitle : 'Display Songs In Song Bank', display : "DisplaySongBankBody", id : 'displaySongBankButton'}}});
        }
    }
    // returns correct body operation based on the active operation
    returnActiveOperationBody(){
        let body = <div></div>
        Object.values(this.state.operations).forEach((elm, ind, arr) => {
            console.log(this.state.songsFromSongBank);
            console.log(`active operation body ran`);
            if(elm.active){
                let Body = BodyComponents[elm.display];
                body = <Body songs={this.state.songsFromSongBank} />
            }
        })
        return body;
    }
    // function that given an array of song ids returns the url needed to request to spotify to receive the list of tracks
    getSongsRequestUrl(songs){
        let baseUrl = 'https://api.spotify.com/v1/tracks?ids=';
        for(let song of songs){
            baseUrl += `${song},`;
        }
        baseUrl = baseUrl.slice(0, -1);
        console.log(baseUrl);
        return baseUrl


    }
}


export default DisplaySongBank
