import React from 'react';
import '../styles/searchSongResponsesBoxComponent.css';


// box that contains songs that user is searching for
// props :
    // positionElement - element to position the box off of
    // searchedSongs - array of songs to display in the box
    // searchSongResponseListItemClickEvent - function that is used to save the information attached to the list element to parents state
class SearchSongResponsesBoxComponent extends React.Component{
    constructor(props){
        super(props);
        // let searchInputPosition = document.getElementById('searchSongToPlayInput').getBoundingClientRect();
        let searchInputPosition = this.props.positionElement.getBoundingClientRect();
        this.responseBoxStyles = {
            top : `${searchInputPosition.bottom + window.scrollY}px`,
            left : `${searchInputPosition.left + 15}px`,
            width : `${searchInputPosition.width - 30}px`
        }
    }
    render(){
        let listElements = this.makeListOfSearchedSongs();
        return(
            <div className="searchSongResponsesBoxComponent" style={this.responseBoxStyles}>
                <ul id="searchSongResponsesList">
                    {listElements}
                </ul>
            </div>
        )
    }
    componentDidMount(){
        document.body.addEventListener('click', this.clickOutsideEvent, false);
    }
    componentWillUnmount(){
        document.body.removeEventListener('click', this.clickOutsideEvent, false);
    }
    makeListOfSearchedSongs(){
        return this.props.searchedSongs.map((elm, index, arr) => {
            return <SearchSongResponseListElement key={elm.id} songUri={elm.uri} songId={elm.id} songName={elm.name} artistName={elm.artist} clickEvent={this.props.searchSongResponseListItemClickEvent}/>
        })
    }
    clickOutsideEvent(ev){
        // getting the search songs input element
        let searchSongsInput = document.getElementById('searchSongToPlayInput');
        // changing the inputs value to blank
        searchSongsInput.value = '';
        // creatings a input event so the SearchSongsControl components state resets
            let event = document.createEvent('Event');
            event.initEvent('input', true, true);
            searchSongsInput.dispatchEvent(event);
        }
}
    // class that represents the list item in the searchSongResponsesBox
    class SearchSongResponseListElement extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (<li onClick={this.props.clickEvent.bind(this, this.props.songName, this.props.artistName, this.props.songUri, this.props.songId)}>
                {this.props.songName} - <span className="italics">{this.props.artistName}</span>
            </li>)
        }
    }

export default SearchSongResponsesBoxComponent