import React from 'react';
import {SpotifyAPIBaseComposition } from '../helper-components';
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

// component that lets the user display, add songs, and delete songs from the song bank
// properties
    // accessToken;
    // getNewAccessToken = function lets the root get a new access token
class DisplaySongBank extends React.Component{
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
        let options = <UpdatedWorkbenchOptionsComponent updateParentState={this.updateActiveOptionComponent.bind(this)} activeOptionComponent={this.state.activeOptionComponent} options={[{optionComponent : 'DisplaySongBankBody', textContent : 'Display Songs'},{optionComponent : 'AddSongsToSongBankBody', textContent : "Add Songs"},{optionComponent : "DeleteSongsFromSongBankBody", textContent : "Delete Songs"}]} />
        return (
            <>
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
        this.setSongsFromSongBank();
    }
    async componentDidUpdate(){
        this.setSongsFromSongBank();
    }
    // makes the request to spotify to get the songs information
    async setSongsFromSongBank(){
        try{
            // gets the array of song ids from the database
            let songIds = await this.props.getSongIdsFromSongBank();
            // gets the songs 
            let songs = await this.props.getSongsFromIds(songIds);
        this.setState({
            songsFromSongBank : songs,
            passOnSongBank : songs
        });
        }catch(err){
            console.log(err);
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


export default SpotifyAPIBaseComposition(DisplaySongBank)
