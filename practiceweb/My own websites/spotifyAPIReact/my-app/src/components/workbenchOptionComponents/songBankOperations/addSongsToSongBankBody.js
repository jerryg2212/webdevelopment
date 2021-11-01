import React from 'react';
import SongListContainer from '../../songListContainer';
import SearchSongControlComponent from '../../searchSongControlComponent';
import { spotifyAPIRequest, amountOfColumns } from '../../../helper-functions';
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from '../../helper-components';
import {addSongToSongBankRequest} from '../../../helper-functions.js';


class AddSongsToSongBankBody extends React.Component{
    constructor(props){
        super(props);
        this.searchSongInputRef = React.createRef();
        this.searchSongControlComponentSubmitEventHandler = this.searchSongControlComponentSubmit.bind(this);
    }
    render(){
        return (
            <div id="addSongsToSongBankBody">
                <SearchSongControlComponent ref={this.searchSongInputRef} rootThis={this.props.rootThis} accessToken={this.props.accessToken} submitEventHandler={this.searchSongControlComponentSubmitEventHandler}/>
                {(this.props.songs.length > 0) && <SongListContainer songList={this.props.songs} columns={amountOfColumns(this.props.songs.length)}/> }
            </div>
            )
    }
    // add song button click event passed to searchSongControlComponent
    async searchSongControlComponentSubmit(){
        await this.props.addSongsToSongBank(JSON.stringify({songs : [this.searchSongInputRef.current.state.activeSongId]}));
        await this.props.updateState();
    }
}


export default  SpotifyAPIBaseComposition(AddSongsToSongBankBody);