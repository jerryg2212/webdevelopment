import React from 'react';
import { SpotifyAPIBase } from '../helper-components';
import '../../styles/displaySongBank.css';
import UpdatedWorkbenchOptionsComponent from '../updatedWorkBenchOptionsComponent';
import DisplaySongBankBody from './songBankOperations/displaySongBankBody';
import AddSongsToSongBankBody from './songBankOperations/addSongsToSongBankBody';
import DeleteSongsFromSongBankBody from './songBankOperations/deleteSongsFromSongBankBody';
import { getSongsFromSongBankRequest } from '../../helper-functions';
import { spotifyAPIRequest, getSongsRequestUrl} from '../../helper-functions';
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
            activeOptionComponent : "DisplaySongBankBody"
        }
        // array that holds objects that represent the option titles in order to display the correct title
        this.optionTitles = [
            {component : "DisplaySongBankBody", title : 'Display Songs In Song Bank'},
            {component : "AddSongsToSongBankBody", title : "Add Songs To Song Bank"},
            {component : "DeleteSongsFromSongBankBody", title : "Delete Songs From Song Bank"}
        ]
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let options = <UpdatedWorkbenchOptionsComponent updateParentState={this.updateActiveOptionComponent.bind(this)} activeOptionComponent={this.state.activeOptionComponent} options={[{optionComponent : 'DisplaySongBankBody', textContent : 'Display Songs'},{optionComponent : 'AddSongsToSongBankBody', textContent : "Add Songs"},{optionComponent : "DeleteSongsFromSongBankBody", textContent : "Delete Songs"}]} />
        return (
            <>
            {error}
            <div id="displaySongBankHeader">
                <h1>{this.displayActiveOperationTitle()}</h1>
            </div>
            {options}

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
            let url = getSongsRequestUrl(songIds.slice(0, maxLengthRequest));
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
        for(let option of this.optionTitles){
            if(option.component === this.state.activeOptionComponent){return option.title}
        }
    }
    updateActiveOptionComponent(newOptionComponent){
        this.setState({activeOptionComponent : newOptionComponent});
    }
    // returns correct body operation based on the active operation
    returnActiveOperationBody(){
        let Body = BodyComponents[this.state.activeOptionComponent];
        return <Body songs={this.state.songsFromSongBank} updateState={this.setSongsFromSongBank.bind(this)} rootThis={this.props.rootThis} accessToken={this.props.accessToken} />;
    }
}


export default DisplaySongBank
