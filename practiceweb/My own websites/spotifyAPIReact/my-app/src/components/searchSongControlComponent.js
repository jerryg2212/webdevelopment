import React from 'react';
import ReactDOM from 'react-dom';
import SearchSongResponsesBoxComponent from './searchSongsResponsesBoxComponent';
import { spotifyAPIRequest } from '../helper-functions.js';
import {SpotifyAPIBase} from './helper-components.js'



// class that holds the input element and the add button
// props : 
// rootThis - reference to the root component for the purposes of the spotifyAPIBase component
// submitEventHandler - function to run when the submit button is clicked
// accessToken = the access token
class SearchSongControlComponent extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            activeSongUri : '',
            activeSongId : '',
            songInput : '',
            searchedSongs : []
        }
        this.searchSongOnInputHandler = this.searchSongOnInput.bind(this);
        this.searchSongResponseListItemClickEventHandler = this.searchSongResponseListItemClickEvent.bind(this);
        this.inputElementRef = React.createRef();
    }
    render(){
        let error = this.returnCorrectErrorMessage();
        let body = ReactDOM.createPortal(<SearchSongResponsesBoxComponent searchSongResponseListItemClickEvent={this.searchSongResponseListItemClickEventHandler} searchedSongs={this.state.searchedSongs} positionElement={this.inputElementRef.current}/>,document.body);
        let songResponsesBox = (this.state.searchedSongs.length > 1 && body)
        return(
            <>
            {error}
            {songResponsesBox}
            <input className="searchSongInput" id="123" type="text" value={this.state.songInput} onInput={this.searchSongOnInputHandler} ref={this.inputElementRef}></input>
            <button className='secondaryButtonStyle positionAbsolute' onClick={this.addSongToSongBankButtonSubmitEvent.bind(this)}>Bank Song</button>
            </>
        )
    }
    async searchSongOnInput(ev){
        this.setState({songInput: ev.target.value}, async () => {
            try{
                // get list of song resoponses from the api
                let searchedSongsResponse = await spotifyAPIRequest(`https://api.spotify.com/v1/search?q=${this.state.songInput}&type=track&limit=5`, this.props.accessToken);
                let searchedSongsList = JSON.parse(searchedSongsResponse)
                    searchedSongsList = searchedSongsList.tracks.items;
                    let searchedSongs = []
                    // making an array of song information so the response block renders after the new state is set
                    for(let song of searchedSongsList){
                        searchedSongs.push({name: song.name, artist : song.artists[0].name, id : song.id, uri : song.uri});
                    }
                    this.setState({searchedSongs: searchedSongs});
            }catch(err){
                console.log(err);
                this.handleResponseForErrors(err);
                this.setState({searchedSongs: []});
            }
        });
    }
    // click event for the song response list item
    searchSongResponseListItemClickEvent(songName, artistName, songUri, songId, ev){
        // getting the input element and changing its value
      //  this.inputElementRef.current.value = `${songName} - ${artistName}`;
        // setting the state so the search resonse box does not render and saves the activeSongId
        this.setState({searchedSongs : [], activeSongUri : songUri, activeSongId : songId, songInput : `${songName} - ${artistName}`});
    }
    // submit event for the button
    addSongToSongBankButtonSubmitEvent(ev){
        if(this.state.activeSongId == ''){return}
        this.inputElementRef.current.focus();
        this.props.submitEventHandler(this.state.activeSongUri);
        this.setState({
            activeSongUri : '',
            activeSongId : '',
            songInput : '',
            searchedSongs : []
        })
    }
}



export default SearchSongControlComponent