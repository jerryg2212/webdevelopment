import React from 'react';
import { SpotifyAPIBase } from '../helper-components';
import '../../styles/displaySongBank.css';
import WorkbenchOptionsComponent from '../workbenchOptionsComponent';
import UpdatedWorkbenchOptionsComponent from '../updatedWorkBenchOptionsComponent';
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
            songsFromSongBank : [],
            operations : [{active : false, title : 'Add Songs', headerTitle : 'Add Songs To Song Bank', clickEventHandler : this.operationClickEvent.bind(this), display : "AddSongsToSongBankBody", id : 'addSongToSongBankButton'}, {active : false, title : 'Delete Songs', headerTitle : 'Delete Songs From Song Bank', clickEventHandler : this.operationClickEvent.bind(this), display : 'DeleteSongsFromSongBankBody', id : 'removeSongFromSongBankButton'}, {active : true, title : 'Display Songs', headerTitle : 'Display Songs In Song Bank', clickEventHandler : this.operationClickEvent.bind(this), display : 'DisplaySongBankBody', id : 'displaySongBankButton'}],
            activeOptionComponent : "DisplaySongBankBody"
        }
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let operations = <WorkbenchOptionsComponent operations={this.state.operations}/>
        return (
            <>
            {error}
            <div id="displaySongBankHeader">
                <h1>{this.displayActiveOperationTitle()}</h1>
            </div>
            {operations}

            <div id="displaySongBankBody">
                {this.returnActiveOperationBody()}
            </div>
            </>
        )
    }
    async componentDidMount(){
        try{
            await this.setUserId(this.props.accessToken);
            this.setSongsFromSongBank();
        }catch(err){
            this.handleResponseForErrors(err);
        }
    }
    // makes the request to spotify to get the songs information
    async setSongsFromSongBank(){
        try{
            console.log('setsongsfromsongbankran');
            // gets the array of song ids from the database
            let songIds = await this.getSongIds();
            let songs = [];
            while(songIds.length != 0){
            let maxLengthRequest = Math.min(songIds.length, 50);
            let url = this.getSongsRequestUrl(songIds.slice(0, maxLengthRequest));
            songIds.splice(0, maxLengthRequest);
            let songsResponse = await spotifyAPIRequest(url, this.props.accessToken);
            songsResponse = JSON.parse(songsResponse);
            songs = songs.concat(songsResponse.tracks);
            this.setState({
                songsFromSongBank : songs,
                passOnSongBank : songs
            });
        }
        }catch(err){
            this.handleResponseForErrors(err);
        }
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
    operationClickEvent(ev){
        let operations = [];
        let stateOperations = this.state.operations;
      //  let songsFromSongBank = this.state.songsFromSongBank;
        
        for(let operation of stateOperations){
            if(operation.title == ev.target.textContent){
                operation.active = true;
            }else{
                operation.active = false;
            }
            operations.push(operation);
        }
        
        this.setState({
            operations : operations,
            songsFromSongBank : this.state.songsFromSongBank
        });
    }
    // returns correct body operation based on the active operation
    returnActiveOperationBody(){
        let Body = <div></div>
        for(let elm of this.state.operations){
            if(elm.active){
                 Body = BodyComponents[elm.display];
            }
        }
        return <Body songs={this.state.songsFromSongBank} updateState={this.setSongsFromSongBank.bind(this)} rootThis={this.props.rootThis} accessToken={this.props.accessToken}/>;
    }
    updateActiveOptionComponent(newOptionComponent){
        this.setState({activeOptionComponent : newOptionComponent});
    }
   /* returnActiveOperationBody(){
        let Body = BodyComponents[this.state.activeOperation];
        return <Body songs={this.state.songsFromSongBank} />
    }*/
    // function that given an array of song ids returns the url needed to request to spotify to receive the list of tracks
    getSongsRequestUrl(songs){
        let baseUrl = 'https://api.spotify.com/v1/tracks?ids=';
        for(let song of songs){
            baseUrl += `${song},`;
        }
        baseUrl = baseUrl.slice(0, -1);
        return baseUrl


    }
}


export default DisplaySongBank
