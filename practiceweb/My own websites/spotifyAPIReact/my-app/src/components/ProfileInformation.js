import React from 'react';
import {spotifyAPIRequest, trimSongName} from '../helper-functions.js';


class ProfileInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            songsTimeRange : 'medium_term',
            songsLimit : 5,
            artistsTimeRange : 'medium_term',
            artistsLimit : 5,
            topSongs : [],
            topArtists : []
        }
    }
    render(){
        return (
            <div id="userInformationContainer">
                <AccountInformation accessToken={this.props.accessToken}/>
                <MusicInformation topSongs={this.state.topSongs}/>
            </div>
        )
    }
    componentDidMount(){
        this.getUsersTopSongs();
    }
   /* shouldComponentUpdate(nextProps, nextState){
        if(nextProps.accessToken === this.props.accessToken && nextState == this.state) return false;
        return true;
    }
    componentDidUpdate(){
        // no access token so return
        if(this.props.accessToken == undefined){return}
        // getting the users top songs and artists
        this.getUsersTopSongs();
    }*/
    // functions that returns a list of users top songs
    async getUsersTopSongs(){
        // constructing the url
            let url = new URL('https://api.spotify.com/v1/me/top/tracks');
            let searchParams = new URLSearchParams()
            searchParams.set('time_range', this.state.songsTimeRange);
            searchParams.set('limit', this.state.songsLimit);
            url.search = searchParams.toString();
        try{
            let topSongsResponse = await spotifyAPIRequest(url.toString(), this.props.accessToken);
            let topSongs = JSON.parse(topSongsResponse);
            console.log(`this is the users top ${this.state.songsLimit} songs: ${topSongs}`)
            let topSongTitles = [];
            for(let track of topSongs.items){
                topSongTitles.push(track);
            }
            this.setState({
                topSongs: topSongTitles
            })
        }catch(err){
            console.log(`there was an error getting users top songs ${err}`)
        }
    }
}

export default ProfileInformation

    // holds users account information
    class AccountInformation extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                linkToUserPage : '',
                profileName : '',
                userEmail : '',
                numberOfFollowers : '',
                accountType : ''
            }
            console.log('rendered');
            this.profileInformationRequestURL = 'https://api.spotify.com/v1/me';
        }
        render(){
            return (
                <div>
                    <div id="accountInformationContainer">
                        <a href={this.state.linkToUserPage}><h1>{this.state.profileName}</h1></a>
                        <h3 id="userEmailHeader">{this.state.userEmail}</h3>
                        <p>#Followers {this.state.numberOfFollowers}</p>
                        <p>Account Type: {this.state.accountType}</p>
                    </div>
                </div>                
            )
        }
        async componentDidMount(){
            try{
                let profileInformationResponse = await spotifyAPIRequest(this.profileInformationRequestURL, this.props.accessToken);
                let profileInformation = JSON.parse(profileInformationResponse);
               this.setState({
                    linkToUserPage : profileInformation.external_urls.spotify,
                    profileName : profileInformation.display_name,
                    userEmail : profileInformation.email,
                    numberOfFollowers : profileInformation.followers.total,
                    accountType: profileInformation.product
                })
               }catch(err){
                    window.location = '/';
               }
        }
      /*  shouldComponentUpdate(nextProps, nextState){
            if(this.props.accessToken == nextProps.accessToken){return false}
            return true;
        }
       async componentDidUpdate(prevProps){
           // we have no access token so return
           //if(this.props.accessToken == undefined)  { window.location = '/'}
           try{
            let profileInformationResponse = await spotifyAPIRequest(this.profileInformationRequestURL, this.props.accessToken);
            let profileInformation = JSON.parse(profileInformationResponse);
           this.setState({
                linkToUserPage : profileInformation.external_urls.spotify,
                profileName : profileInformation.display_name,
                userEmail : profileInformation.email,
                numberOfFollowers : profileInformation.followers.total,
                accountType: profileInformation.product
            })
           }catch(err){

           }
        }*/
    }

    // holds users favorite music information
    class MusicInformation extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div id="favoriteMusicInformationContainer">
                    <FavoriteMusicInformationForm />
                    <h1 id="topSongsHeader">Top Songs</h1>
                    <TopSongsContainer topSongs={this.props.topSongs} />
                    <h1 id="topArtistsHeader">Top Artists</h1>
                    <TopArtistsContainer />
                </div>
            )
        }
    }

        // form that has select elements for the time range and the number of songs and artists
        class FavoriteMusicInformationForm extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return(
                    <form id="favoriteMusicSearchForm">
                        <div id="favoriteMusicSelectionsContainer">
                            <FavoriteMusicSelectElementsContainer forAttribute="timeRangeDropDown" labelId="timeRangeDropDownLabel" labelText="Time Range" />
                            <FavoriteMusicSelectElementsContainer forAttribute="amountOfSongsDropDown" labelId="amountOfSongsLabel" labelText="# Songs" selectId="amountOfSongsDropDown" />
                            <FavoriteMusicSelectElementsContainer forAttribute="amountOfArtistsDropDown" labelId="amountOfArtistsLabel" labelText="# Artists" selectId="amountOfArtistsDropDown" />
                        </div>
                        <button type="Submit" id="favoriteMusicSubmitButton">Display</button>
                    </form>
                )
            }
        }
            // container that holds the select elements and labels for each of the selections in the form
            class FavoriteMusicSelectElementsContainer extends React.Component{
                constructor(props){
                    super(props);
                }
                render(){
                    return(
                        <div>
                            <label htmlFor={this.props.forAttribute} id={this.props.labelId}>{this.props.labelText}</label>
                            <FavoriteMusicSelectElement id={this.props.selectId} />
                        </div>
                    )
                }
            }
                // select element with the options 5-50
                class FavoriteMusicSelectElement extends React.Component{
                    constructor(props){
                        super(props);
                        this.state = {value: 5}
                        this.handleChange = this.handleChange.bind(this);
                    }
                    render(){
                        let options = this.makeOptions();
                        return(
                            <select value={this.state.value} id={this.props.id} onChange={this.handleChange}>
                                {options}
                            </select>
                        )
                    }
                    handleChange(ev){
                        this.setState({
                            value: ev.target.value
                        })
                    }
                    makeOptions(){
                        let options = [];
                        for(let i = 5; i <= 50; i = i + 5){
                            options.push(<option value={i} key={i}>{i}</option>);
                        }
                        return options;
                    }
                }
        // container that holds a list of the users top songs
        class TopSongsContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                let songs = this.listOfSongs();
                return (
                    <div id="topSongsContainer">
                        <ol id="usersTopSongsList">{songs}</ol>
                    </div>
                )
            }
            listOfSongs(){
                let songs = [];
                console.log(this.props.topSongs);
                for( let song of this.props.topSongs){
                    songs.push(<li>{trimSongName(song.name)}  --  <span className="nameOfArtist">{song.artists[0].name}</span></li>)
                }
                return songs;
            }
        }
        // container that holds a list of the users top artists
        class TopArtistsContainer extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
               // let artists = this.listOfArtists();
                return (
                    <div id="topArtistsContainer">
                        <ol id="usersTopArtists"></ol>
                    </div>
                )
            }
            listOfArtists(){
                let artists = [];
                for( let artist of this.state.artists){
                    artists.push(<li>{artist.name}</li>)
                }
                return artists
            }
        }