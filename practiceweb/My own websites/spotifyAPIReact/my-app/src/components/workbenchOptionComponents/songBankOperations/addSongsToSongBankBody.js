import React from 'react';
import SongListContainer from '../../songListContainer';
import SearchSongControlComponent from '../../searchSongControlComponent';
import { spotifyAPIRequest } from '../../../helper-functions';
import { SpotifyAPIBase } from '../../helper-components';
import {addSongToSongBankRequest} from '../../../helper-functions.js';


class AddSongsToSongBankBody extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.searchSongInputRef = React.createRef();
        this.searchSongControlComponentSubmitEventHandler = this.searchSongControlComponentSubmit.bind(this);
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        console.log(`songs ${this.props.songs.length}`);
        return (
            <div id="addSongsToSongBankBody">
                {error}
                <SearchSongControlComponent ref={this.searchSongInputRef} rootThis={this.props.rootThis} accessToken={this.props.accessToken} submitEventHandler={this.searchSongControlComponentSubmitEventHandler}/>
                {(this.props.songs.length > 0) && <SongListContainer songList={this.props.songs} columns={this.amountOfColumns(this.props.songs)}/> }
            </div>
            )
    }
    async componentDidMount(){
        try{
            await this.setUserId(this.props.accessToken);
        }catch(err){
            this.handleResponseForErrors(err);
        }
    }
    // add song button click event passed to searchSongControlComponent
    async searchSongControlComponentSubmit(){
        await addSongToSongBankRequest(this.userId, this.searchSongInputRef.current.state.activeSongId);
        await this.props.updateState();
    }
    // returns the number of columns wanted based on how many songs their are in the active playlist
    amountOfColumns(songs){
        return  Math.min(Math.ceil(songs.length / 40), 3);
    }
}


export default AddSongsToSongBankBody