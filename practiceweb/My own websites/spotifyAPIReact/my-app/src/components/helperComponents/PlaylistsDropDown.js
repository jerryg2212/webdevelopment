import React from "react";
import '../../styles/helperComponents/playlistsDropDown.css';
import dropDownArrow from '../../icons/drop-down-arrow.png';



// class that acts as a drop down element for the users playlists 
// properties 
    // playlists = array of playlists to select from
    // updateParentState = function ran when a new playlist is selected and it takes the playlist object as the parameter

class PlaylistsDropDown extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedPlaylist : undefined,
            displayList : false    // whether or not to show the dropdown list
        }
    }
    render(){
        return (
            <>
            <div className="selectAPlaylistDropDownContainer">
                <div className="playlistImageAndNameContainer">
                    {this.returnSelectedPlaylist()}
                </div>
                <div className="dropDownArrowContainer" onClick={this.dropDownArrowClickEvent.bind(this)}>
                    <span><img src={dropDownArrow}/></span>
                </div>
            </div>
            {this.returnAllPlaylistListElements()}
            </>
        )
    }
    // returns either telling the user to select a playlist or the selected playlist
    returnSelectedPlaylist(){
        if(!this.state.selectedPlaylist){return <p>Select A Playlist</p>}
        return <li className="selectedPlaylistDropDownListElement"><img src={(this.state.selectedPlaylist.images[0]) ? this.state.selectedPlaylist.images[0].url : '' } /><p>{this.state.selectedPlaylist.name}</p></li>
    }
    // returns either the selected playlist only or all the playlists
    returnAllPlaylistListElements(){
        if(this.state.displayList){
            return (
            <ul className="listOfPlaylists">{this.props.playlists.map((elm, ind, arr) => {
                if(this.state.selectedPlaylist){
                    if(this.state.selectedPlaylist.id === elm.id) return
                }
                return <li className="playlistDropDownListElement" key={elm.id} playlist={JSON.stringify(elm)} onClickCapture={this.dropDownListElementClickEvent.bind(this)}><img src={(elm.images[0]) ? elm.images[0].url : '' }/><p>{elm.name}</p></li>
            })}</ul>
            )
        }
    }

    // Events
        // click event for the drop down arrow
        // it toggles the displayList state event
        dropDownArrowClickEvent(ev){
            let displayList = this.state.displayList;
            this.setState({displayList : !displayList});
        }
        // click event for the list elements in the drop down
        // changes the value of the selectedPlaylist in the state
        dropDownListElementClickEvent(ev){
            ev.stopPropagation();
            let playlist = JSON.parse(ev.currentTarget.attributes.getNamedItem("playlist").value);
            this.props.updateParentState(playlist);
            this.setState({selectedPlaylist : playlist, displayList : false});
            
        }
}
PlaylistsDropDown.defaultProps = {
    updateParentState : playlist => {return}
}

export default PlaylistsDropDown