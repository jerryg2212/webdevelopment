import React from 'react';
import '../styles/homepage.css';
import { stringifyScopes } from '../helper-functions';

const scopes = {
    // to read users top songs and artists
    user_top_read : 'user-top-read',
    user_read_currently_playing : 'user-read-currently-playing',
    user_read_playback_state : 'user-read-playback-state',
    user_modify_playback_state : 'user-modify-playback-state',
    playlist_read_private : 'playlist-read-private',
    playlist_read_collaborative : 'playlist-read-collaborative',
    playlist_modify_public : 'playlist-modify-public',
    playlist_modify_private : 'playlist-modify-private',
    user_read_private : 'user-read-private',
    user_read_email : 'user-read-email'
}

const auth_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=be4c5df5871a48f9b7b18205aa42be9b&show_dialog=true&scope=${encodeURIComponent(stringifyScopes(scopes))}&redirect_uri=http://localhost:3000/&state=hhjjkkjjhh88tdklklcodeisjohncenamypants`;


class Login extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="loginContainer">
                <h1>Login to your Spotify Account</h1>
                <a href={auth_url} >Login</a>
            </div>
        )
    }
    async linkClick(){
        console.log('link clicked');
       /* let request = new XMLHttpRequest();
        request.open('GET', '/api/authorize', true);
        request.send();*/
    }
    componentDidMount(){
        // centers the text of the login page
        document.getElementById('root').style.width = '100%';
        document.body.setAttribute('id', 'loginBody');
    }

}
export default Login