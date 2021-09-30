import '../../styles/workbenchOperationComponents/createNewPlaylist.css';
import {SpotifyAPIBase} from '../helper-components';

class CreateNewPlaylist extends SpotifyAPIBase{
    constructor(props){
        super(props);
        this.state = {
            newPlaylistName : ''
        }
        this.newPlaylistNameInputInputEventHandler = this.newPlaylistNameInputInputEvent.bind(this);
    }
    render(){
        return(
            <div id="createNewPlaylistContainer">
                <header className="workbenchOperationDescriptiveHeader">
                    <p>Create New Playlist</p>
                </header>
                <form style={{marginTop : '30px'}}>
                    <label className="createNewPlaylistLabelHeader" style={{marginTop: "0px"}}>Playlist Name</label><br/>
                    <input type="text" value={this.state.newPlaylistName} onInput={this.newPlaylistNameInputInputEventHandler}></input><br/>
                    <label className="createNewPlaylistLabelHeader">Public Playlist</label><br/>
                        <label htmlFor="publicPlaylistYes">Yes</label>
                        <input type="radio" name="publicPlaylist" value="Yes" id="publicPlaylistYes"></input>
                        <label htmlFor="publicPlaylistNo">No</label>
                        <input type="radio" name="publicPlaylist" value="No" checked></input><br/>
                    <label className="createNewPlaylistLabelHeader">Collaborative</label><br/>
                        <label htmlFor="collaborativePlaylistYes">Yes</label>
                        <input type="radio" name="collaborativePlaylist" value="Yes" id="collaborativePlaylistYes"></input>
                        <label htmlFor="collaborativePlaylistNo">No</label>
                        <input type="radio" name="collaborativePlaylist" value="No" id="collaborativePlaylistNo" checked></input><br/>
                    <button className="secondaryButtonStyle">Create Playlist</button>
                </form>
            </div>
        )
    }
    newPlaylistNameInputInputEvent(ev){
        this.setState({newPlaylistName : ev.target.value});
    }
    createNewPlaylistButtonSubmitEvent(ev){
        // if the name of the new playlist is blank, do not create the new playlist
        if(this.state.newPlaylistName.length < 1){return}
    }
}

export default CreateNewPlaylist