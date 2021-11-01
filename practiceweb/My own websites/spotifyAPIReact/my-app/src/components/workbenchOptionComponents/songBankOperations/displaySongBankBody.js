import React from 'react';
import SongListContainer from '../../songListContainer';
import {amountOfColumns} from '../../../helper-functions';


class DisplaySongBankBody extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            (this.props.songs.length > 0) && <SongListContainer songList={this.props.songs} columns={amountOfColumns(this.props.songs.length)} /> 
            )
            
    }
}

export default DisplaySongBankBody