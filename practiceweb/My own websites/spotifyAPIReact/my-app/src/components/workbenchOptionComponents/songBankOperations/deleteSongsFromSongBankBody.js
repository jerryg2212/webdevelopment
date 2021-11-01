import React from 'react';
import { deleteSongsFromSongBankRequest, spotifyAPIRequest, amountOfColumns } from '../../../helper-functions';
import { SpotifyAPIBase, SpotifyAPIBaseComposition } from '../../helper-components';
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
        let explainationP = <p>Click songs to add them to remove batch</p>
        let deleteSongsButton = <button className="secondaryButtonStyle" onClick={this.deleteSongsButtonClickEventHandler} style={{"display" : "block","margin" : "auto"}}>Remove Songs</button>
        return (
            <div id="deleteSongsFromSongBankBody">
                <div style={{marginTop : '15px', marginBottom : '-10px'}}>
                    {(this.state.deleteMode) ? deleteSongsButton : explainationP}
                    <label className="selectAllLabel">Select All<input type="checkbox" onChange={this.selectAllSongsOnChange.bind(this)} className="selectAllCheckbox" checked={this.state.selectAllSongsChecked} /></label>
                </div>
                {(this.props.songs.length > 0) && <SongListContainer songList={this.props.songs} columns={amountOfColumns(this.props.songs.length)} listItemClickEventHandler={this.songContainerClickEventHandler} activeClassAdder={this.activeClassAdder.bind(this)}/> }
            </div>
            )
    }
    async componentDidMount(){
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
            removeableSongs.add(songId);
        }
        this.setState({removeableSongs : removeableSongs})
    }
    async deleteSongsButtonClickEvent(ev){
        let removeableSongs = this.state.removeableSongs;
        try{
            await this.props.deleteSongsFromSongBank(Array.from(removeableSongs.values()));
            removeableSongs.clear();
            this.setState({removeableSongs: removeableSongs});
            await this.props.updateState();
        }catch(err){
        }finally{
            this.setState({selectAllSongsChecked : false});
        }
    }
    // on change event for the select all songs checkbox
    // adds or removes all the songs from the removeableSongs value in the state
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

export default SpotifyAPIBaseComposition(DeleteSongsFromSongBankBody);