import React from 'react';
import DummyComponent from './workbenchOptionComponents/dummy-component.js';
import DisplayAllPlaylists from './workbenchOptionComponents/displayAllPlaylists.js';
import DisplayAllSongsInPlaylist from './workbenchOptionComponents/displayAllSongsInPlaylist.js';
import CompareTwoPlaylists from './workbenchOptionComponents/compareTwoPlaylists.js';
import DisplaySongBank from './workbenchOptionComponents/displaySongBank.js';
import CreateNewPlaylist from './workbenchOptionComponents/createNewPlaylist.js';
import ManipulateAPlaylist from './workbenchOptionComponents/manipulateAPlaylist.js';

// properties
    // getNewAccessToken = function that lets the parent request for a new access token; this function is called in the ErrorMessage component
class WorkBench extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentlyActiveOperation : undefined,
            currentlySelectedOperation : undefined
        }
        // components that display based on what the selected value is
        this.operationComponent = {
            DummyComponent : DummyComponent,
            DisplayAllPlaylists : DisplayAllPlaylists,
            DisplayAllSongsInPlaylist : DisplayAllSongsInPlaylist,
            CompareTwoPlaylists : CompareTwoPlaylists,
            DisplaySongBank : DisplaySongBank,
            CreateNewPlaylist : CreateNewPlaylist,
            ManipulateAPlaylist : ManipulateAPlaylist
        }
        this.taskSelectChangeEventHandler = this.taskSelectChangeEvent.bind(this);
        this.activateOperationButtonClickEventHandler = this.activateOperationButtonClickEvent.bind(this);
    }
    render(){
        // operation that is selected
        let ActiveOperationComponent = this.operationComponent[this.state.currentlyActiveOperation];
      //  console.log(`this is the active operation ${ActiveOperationComponent}`);
        return (
            <div id="workBenchContainer">
                <div id="workBenchNavBarContainer">
                    <WorkBenchTaskSelect changeEventHandler={this.taskSelectChangeEventHandler}/>
                    <button onClick={this.activateOperationButtonClickEventHandler} className="playSongContainerButton" >Start</button>
                </div>
                <WorkBenchActionContainer>
                    {ActiveOperationComponent && <ActiveOperationComponent accessToken={this.props.accessToken} refreshToken={this.props.refreshToken} rootThis={this.props.rootThis} getNewAccessToken={this.props.getNewAccessToken} />}
                </WorkBenchActionContainer>
            </div>
        )
    }
    taskSelectChangeEvent(ev){
       // console.log(ev.target.value);
        this.setState({currentlySelectedOperation : ev.target.value});
    }
    activateOperationButtonClickEvent(ev){
        this.setState({currentlyActiveOperation : this.state.currentlySelectedOperation});
    }
}
        // returns a label that holds a select element that has options of tasks the user can do
        class WorkBenchTaskSelect extends React.Component{
            constructor(props){
                super(props);
                this.tasks = [{name: '     ', operationComponent : undefined}, /*{name : 'Display All Playlists', operationComponent : 'DisplayAllPlaylists'}, {name : 'Display All Songs In Playlist', operationComponent : 'DisplayAllSongsInPlaylist'},*/ {name : 'Song Bank', operationComponent : 'DisplaySongBank'}, {name : 'Create New Playlist', operationComponent : 'CreateNewPlaylist'}, {name : 'Manipulate A Playlist', operationComponent : 'ManipulateAPlaylist'}, {name : 'Compare Two Playlists', operationComponent : 'CompareTwoPlaylists'}];
            }
            render(){
                let options = this.makeOptions();
                return (
                    <label>What would you like to do?
                        <select onChange={this.props.changeEventHandler}>{options}</select>
                    </label>
                    )
                }
            makeOptions(){
                return this.tasks.map((elm, index, arr) => {
                    return <option key={elm.name} value={elm.operationComponent}>{elm.name}</option>
                })
            }
        }
    class WorkBenchActionContainer extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div id="workBenchActionContainer">
                    {this.props.children}
                </div>
            )
        }
    }


export default WorkBench