import React from 'react';


class DisplaySongBankBody extends React.Component{
    constructor(props){
        super(props);
        this.state = {songs : []}
    }
    render(){
        return (
            <p>this is the new display song bank body</p>
        )
    }
    async componentDidMount(){
        // make request to server to get the array of song ids from the database
        // make request to spotify to get the songs
    }
}

export default DisplaySongBankBody