import React from 'react';
import axios from 'axios';
import ProfileInformation from '../components/ProfileInformation.js';
import WorkBench from '../components/WorkBench.js';
import SongControlSideBar from '../components/SongControlSideBar.js';
import '../styles/dashboard.css';

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            access_token : undefined,
            refresh_token : undefined
        }
    }
    render(){
        return (this.state.access_token) ? <div id="pageContainer">
        <ProfileInformation accessToken={this.state.access_token}/>
        <WorkBench></WorkBench>
        <SongControlSideBar></SongControlSideBar>
        </div> : <div></div>
    }
    async componentDidMount(){
        // gets rid of the code in the url
        window.history.pushState({}, null, '/');
        try{
            let tokens = await axios.post('/token', {code: this.props.code});
            this.setState({access_token : tokens.data.access_token, refresh_token : tokens.data.refresh_token});
        }catch(err){
            window.location = '/';
        }
    }
    componentDidUpdate(){
        // we have no access token so go back to homepage
       if(this.state.access_token == undefined)  { window.location = '/'}
    
    }
}

export default Dashboard;