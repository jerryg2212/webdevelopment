import React from 'react';
import {spotifyAPIRequest, trimSongName, spotifyAPIRequestPost} from '../helper-functions.js';
import { SpotifyAPIBase } from './helper-components.js';

let accessTokenContext = React.createContext(undefined);
class ProfileInformation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accountInformation : {},
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
            <accessTokenContext.Provider value={this.props.accessToken}>
            <div id="userInformationContainer">
                <AccountInformation rootThis={this.props.rootThis} />
                <MusicInformation rootThis={this.props.rootThis}/>
            </div>
            </accessTokenContext.Provider>
        )
    }
}

export default ProfileInformation

    // holds users account information
    class AccountInformation extends SpotifyAPIBase{
        constructor(props){
            super(props);
            this.state = {
                linkToUserPage : '',
                profileName : '',
                userEmail : '',
                numberOfFollowers : '',
                accountType : '',
            }
        }
        render(){
            let error = this.returnCorrectErrorMessage();
            return (
                <div>
                    {error}
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
            this.setAccountInformation();
        }
        async setAccountInformation(){
            try{
                let profileInformationResponse = await spotifyAPIRequest('https://api.spotify.com/v1/me', this.context);
                let profileInformation = JSON.parse(profileInformationResponse);
                    this.setState({
                        linkToUserPage : profileInformation.external_urls.spotify,
                        profileName : profileInformation.display_name,
                        userEmail : profileInformation.email,
                        numberOfFollowers : profileInformation.followers.total,
                        accountType : profileInformation.product
                })
           }catch(err){
                this.handleResponseForErrors(err);
           }
        }
        static contextType = accessTokenContext;
    }

    // holds users favorite music information
    class MusicInformation extends SpotifyAPIBase{
        constructor(props){
            super(props);
            this.state = {
                timeRange : 'medium_term',
                songsLimit: 5,
                artistsLimit : 5,
                topSongs : [],
                topArtists : []
            }
            this.favoriteMusicInformationFormSubmitHandler = this.favoriteMusicInformationFormSubmitHandler.bind(this);
        }
        render(){
            let error = this.returnCorrectErrorMessage();
            return (
                <div id="favoriteMusicInformationContainer">
                    {error}
                    <FavoriteMusicInformationForm formSubmitHandler={this.favoriteMusicInformationFormSubmitHandler} />
                    <h1 id="topSongsHeader">Top Songs</h1>
                    <TopSongsContainer topSongs={this.state.topSongs} />
                    <h1 id="topArtistsHeader">Top Artists</h1>
                    <TopArtistsContainer topArtists={this.state.topArtists} />
                </div>
            )
        }
        async componentDidMount(){
            this.setUsersTopSongs();
            this.setUsersTopArtists();
        }
       /* shouldComponentUpdate(nextProps, nextState){
            if(this.state.timeRange === nextState.timeRange && this.state.songsLimit === nextState.songsLimit && this.state.artistsLimit === nextState.artistsLimit){return false}
            return true
        }
        async componentDidUpdate(){
            this.setUsersTopSongs();
            this.setUsersTopArtists();
        }*/
        favoriteMusicInformationFormSubmitHandler(newState){
            this.setState(newState, () => {
                this.setUsersTopSongs();
                this.setUsersTopArtists();
            });

        }
        async setUsersTopSongs(){
                // constructing the url
                let url = new URL('https://api.spotify.com/v1/me/top/tracks');
                let searchParams = new URLSearchParams();
                searchParams.set('time_range', this.state.timeRange);
                searchParams.set('limit', this.state.songsLimit);
                url.search = searchParams.toString();
            try{
                let topSongsResponse = await spotifyAPIRequest(url.toString(), this.context);
                let topSongs = JSON.parse(topSongsResponse);
                    let topSongTitles = [];
                    for(let track of topSongs.items){
                        topSongTitles.push(track);
                    }
                    this.setState({
                        topSongs: topSongTitles
                    })
            }catch(err){
                this.handleResponseForErrors(err);
                console.log(`there was an error getting users top songs ${err}`)
            }
        }
        async setUsersTopArtists(){
                // construction the url
                let url = new URL('https://api.spotify.com/v1/me/top/artists');
                let searchParams = new URLSearchParams();
                searchParams.set('time_range', this.state.timeRange);
                searchParams.set('limit', this.state.artistsLimit);
                url.search = searchParams.toString();
            try{
                let topArtistsResponse = await spotifyAPIRequest(url.toString(), this.context);
                let topArtists = JSON.parse(topArtistsResponse);
                    let topArtistsNames = [];
                    for(let artist of topArtists.items){
                        topArtistsNames.push(artist.name);
                    }
                    this.setState({
                        topArtists : topArtistsNames
                    })
            }catch(err){
                this.handleResponseForErrors(err);
                console.log('there was an error getting the users top artists');
            }
        }
        static contextType = accessTokenContext;
    }

        // form that has select elements for the time range and the number of songs and artists
        class FavoriteMusicInformationForm extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    timeRange : 'medium_term',
                    numberOfSongs : 5,
                    numberOfArtists : 5
                }
                this.formSubmitHandler = this.formSubmitHandler.bind(this);
            }
            render(){
                return(
                    <form id="favoriteMusicSearchForm" onSubmit={this.formSubmitHandler}>
                        <div id="favoriteMusicSelectionsContainer">
                            <FavoriteMusicSelectElementsContainer forAttribute="timeRangeDropDown" labelId="timeRangeDropDownLabel" labelText="Time Range" selectId="timeRangeDropDown" selectElement={<TimeRangeSelectElement id="timeRangeDropDown"></TimeRangeSelectElement>} />
                            <FavoriteMusicSelectElementsContainer forAttribute="amountOfSongsDropDown" labelId="amountOfSongsLabel" labelText="# Songs" selectId="amountOfSongsDropDown" selectElement={<FavoriteMusicSelectElement id="amountOfSongsDropDown" />} />
                            <FavoriteMusicSelectElementsContainer forAttribute="amountOfArtistsDropDown" labelId="amountOfArtistsLabel" labelText="# Artists" selectId="amountOfArtistsDropDown" selectElement={<FavoriteMusicSelectElement id="amountOfArtistsDropDown" />} />
                        </div>
                        <button type="Submit" id="favoriteMusicSubmitButton">Display</button>
                    </form>
                )
            }
            formSubmitHandler(ev){
                ev.preventDefault();
                let formElements = ev.target.elements;
                console.log(`these are the form elements ${formElements}`);
                let timeRangeValue = formElements.namedItem("timeRangeDropDown").value;
                let numberOfSongsValue = formElements.namedItem("amountOfSongsDropDown").value;
                let numberOfArtistsValue = formElements.namedItem('amountOfArtistsDropDown').value;
                console.log(`the time range is ${timeRangeValue} the number of songs is ${numberOfSongsValue} the number of artsits ${numberOfArtistsValue}`);
                this.props.formSubmitHandler({timeRange : timeRangeValue, songsLimit : numberOfSongsValue, artistsLimit : numberOfArtistsValue});
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
                            {this.props.selectElement}
                        </div>
                    )
                }
            }
                // time range select element 
                class TimeRangeSelectElement extends React.Component{
                    constructor(props){
                        super(props);
                        this.state = {range: 'medium_term'}
                        this.handleChange = this.handleChange.bind(this);
                    }
                    render(){
                        let options = this.makeOptions();
                        return (
                            <select id={this.props.id} value={this.state.range} onChange={this.handleChange}>{options}</select>
                        )
                    }
                    handleChange(ev){
                        this.setState({range: ev.target.value});
                    }
                    makeOptions(){
                        let optionsLength = [{value : 'short_term', text : 'Short Term'}, {value: 'medium_term', text : 'Medium Term'}, {value: 'long_term', text : 'Long Term'}];
                        let options = optionsLength.map((elm, index, arr) => {
                            return <option value={elm.value} key={elm.value}>{elm.text}</option>
                        });
                        return options
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
                    makeOptions(options = []){
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
                for( let song of this.props.topSongs){
                    songs.push(<li key={song.name}>{trimSongName(song.name)}  --  <span className="nameOfArtist">{song.artists[0].name}</span></li>)
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
                let artists = this.listOfArtists();
                return (
                    <div id="topArtistsContainer">
                        <ol id="usersTopArtists">{artists}</ol>
                    </div>
                )
            }
            listOfArtists(){
                let artists = [];
                for( let artist of this.props.topArtists){
                    artists.push(<li key={artist}>{artist}</li>)
                }
                return artists
            }
        }