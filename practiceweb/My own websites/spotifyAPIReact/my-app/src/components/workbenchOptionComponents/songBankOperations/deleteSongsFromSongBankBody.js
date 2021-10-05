import React from 'react';
import { deleteSongsFromSongBankRequest, spotifyAPIRequest } from '../../../helper-functions';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';


class DeleteSongsFromSongBankBody extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            deleteMode : true
        }
        this.songContainerClickEventHandler = this.songContainerClickEvent.bind(this);
        // click event handler for the delete songs button
        this.deleteSongsButtonClickEventHandler = this.deleteSongsButtonClickEvent.bind(this);
        this.removeableSongs = new Set();
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let explainationP = <p>Click songs to add them to remove batch</p>
        let deleteSongsButton = <button className="secondaryButtonStyle" onClick={this.deleteSongsButtonClickEventHandler}>Remove Songs</button>
        return (
            <div id="deleteSongsFromSongBankBody">
                {error}
                <div style={{marginTop : '15px', marginBottom : '-10px'}}>
                    {(this.state.deleteMode) ? deleteSongsButton : explainationP}
                </div>
                {(this.props.songs.length > 1) && <SongListContainer songList={this.props.songs} columns={this.amountOfColumns(this.props.songs)} listItemClickEventHandler={this.songContainerClickEventHandler}/> }
            </div>
            )
    }
    async componentDidMount(){
        try{
            await this.setUserId(this.props.accessToken);
        }catch(err){
            console.log(err);
        }
    }
    songContainerClickEvent(songId, ev){
        // if song is already clicked remove it from the list of songs to remove
        if(ev.currentTarget.classList.contains('removeableSongListContainer')){
            ev.currentTarget.classList.remove('removeableSongListContainer');
            this.removeableSongs.delete(songId);
            console.log(this.removeableSongs);
        }
        // songs is not already clicked so add it to the lsit of songs to remove
        else{
            ev.currentTarget.classList.add('removeableSongListContainer');
            this.removeableSongs.add(songId);
        }
    }
    async deleteSongsButtonClickEvent(ev){
        if(this.removeableSongs.size == 0) return;
        try{
            let response = await deleteSongsFromSongBankRequest(this.userId, this.convertSetToArray(this.removeableSongs));
            await this.props.updateState();
            this.removeableSongs.clear();
        }catch(err){
            this.handleResponseForErrors(err);
        }
    }
    convertSetToArray(tempSet){
        let result = [];
        tempSet.forEach((val) => {
            result.push(val);
        });
        return result;
    }
    // returns the number of columns wanted based on how many songs their are in the active playlist
    amountOfColumns(songs){
        return  Math.min(Math.ceil(songs.length / 40), 3);
    }
}

export default DeleteSongsFromSongBankBody