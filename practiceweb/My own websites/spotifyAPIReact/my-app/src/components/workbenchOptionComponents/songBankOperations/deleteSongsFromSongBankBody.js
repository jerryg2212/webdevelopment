import React from 'react';
import { deleteSongsFromSongBankRequest, spotifyAPIRequest, amountOfColumns } from '../../../helper-functions';
import { SpotifyAPIBase } from '../../helper-components';
import SongListContainer from '../../songListContainer';


class DeleteSongsFromSongBankBody extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            deleteMode : true,
            removeableSongs : new Set(),
            selectAllSongsChecked : false
        }
        this.songContainerClickEventHandler = this.songContainerClickEvent.bind(this);
        // click event handler for the delete songs button
        this.deleteSongsButtonClickEventHandler = this.deleteSongsButtonClickEvent.bind(this);
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let explainationP = <p>Click songs to add them to remove batch</p>
        let deleteSongsButton = <button className="secondaryButtonStyle" onClick={this.deleteSongsButtonClickEventHandler} style={{"display" : "block","margin" : "auto"}}>Remove Songs</button>
        return (
            <div id="deleteSongsFromSongBankBody">
                {error}
                <div style={{marginTop : '15px', marginBottom : '-10px'}}>
                    {(this.state.deleteMode) ? deleteSongsButton : explainationP}
                    <label className="selectAllLabel">Select All<input type="checkbox" onChange={this.selectAllSongsOnChange.bind(this)} className="selectAllCheckbox" checked={this.state.selectAllSongsChecked} /></label>
                </div>
                {(this.props.songs.length > 0) && <SongListContainer songList={this.props.songs} columns={amountOfColumns(this.props.songs.length)} listItemClickEventHandler={this.songContainerClickEventHandler} activeClassAdder={this.activeClassAdder.bind(this)}/> }
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
    songContainerClickEvent(songId, songUri, ev){
        let removeableSongs = this.state.removeableSongs;
        // if song is already clicked remove it from the list of songs to remove
        if(ev.currentTarget.classList.contains('removeableSongListContainer')){
           // ev.currentTarget.classList.remove('removeableSongListContainer');
            removeableSongs.delete(songId);
        }
        // songs is not already clicked so add it to the lsit of songs to remove
        else{
            //ev.currentTarget.classList.add('removeableSongListContainer');
            removeableSongs.add(songId);
        }
        this.setState({removeableSongs : removeableSongs})
    }
    async deleteSongsButtonClickEvent(ev){
        let removeableSongs = this.state.removeableSongs;
        try{
            if(removeableSongs.size == 0) return;
            console.log(removeableSongs.size);
            let removeableSongsArray = Array.from(removeableSongs.values());
            while(removeableSongsArray.length > 0){
                let response = await deleteSongsFromSongBankRequest(this.userId, removeableSongsArray.splice(0, 50));
            }
            removeableSongs.clear();
            this.setState({removeableSongs: removeableSongs});
            await this.props.updateState();
        }catch(err){
            this.handleResponseForErrors(err);
        }finally{
            this.setState({selectAllSongsChecked : false});
        }
    }
  /*convertSetToArray(tempSet){
        let result = [];
        tempSet.forEach((val) => {
            result.push(val);
        });
        return result;
    }*/
    // on change event for the select all songs checkbox
    selectAllSongsOnChange(ev){
        let removeableSongs = this.state.removeableSongs;
        let checked = ev.currentTarget.checked;
        if(checked){
            for(let song of this.props.songs){
                removeableSongs.add(song.id);
            }
        }else{
            removeableSongs.clear();
        }
        this.setState({removeableSongs : removeableSongs, selectAllSongsChecked : checked});
    }
    // function given to SongListColumn component that returns true if the element is selected
    activeClassAdder(songId){
        return this.state.removeableSongs.has(songId);
    }
}

export default DeleteSongsFromSongBankBody