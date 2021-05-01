
// spotify api keys
/*const client_Id = process.env.CLIENT_ID;
const client_Secret = process.env.CLIENT_SECRET;*/
// redirect uri
const redirecturi = 'http://localhost:8000/callback';
const profilePageBody = document.getElementById('profilePageBody');



class ProfilePage{
    constructor(){
        this.body = profilePageBody;
        this.saveTokens();
        Promise.all([this.getUsersTopSongs(5, 'long_term'), this.getUsersTopArtists(5, 'long_term'), this.saveProfileInformation(), this.getCurrentlyPlayingSong()]).then((values) => {this.makeBody(values)}).catch((err) => {console.log(err)});
        this.displayName;
        this.linkToPage;
        this.userEmail;
        this.accountType;
        this.numberOfFollowers;
        // variables to keep track of the last displayed information on the favorite music form
            this.lastTimeRange = 'long_term';
            this.lastNumberOfSongs = 5;
            this.lastNumberOfArtists = 5;
    }
    loadPage(){
        this.makePage();
    }
    makePage(){
      //  this.makeRequestForTokens();
        //this.displayProfileInformation();
    }
    makeBody(values){
        console.log(values[3]);
        // container that shows the users profile information and their favorite songs information
        this.body.appendChild(this.makeUserInformationContainer(values[0].items, values[1].items));
        // container where you can manipulate playlists and carryout other functionality with playlists and sonds
        this.body.appendChild(this.makeWorkBenchContainer());
        // container where you can search a song and play it and displays information about the currently playing song
        this.body.appendChild(this.makeSearchSongContainer(values[3]));
        //this.body.appendChild(this.displayContainer());
    }
    //container that holds the users profile information and the users favorite music information
    makeUserInformationContainer(songs, artists){
        let userInformationContainer = document.createElement('div');
        userInformationContainer.setAttribute('id', 'userInformationContainer');
            // container that shows the users profile information
                userInformationContainer.appendChild(this.displayProfileInformation());
            // container that shows the users favorite music information
                userInformationContainer.appendChild(this.displayFavoriteMusicInformation(songs, artists));

        return userInformationContainer;
    }
        //makes the container that shows all the user profile information
        // returns div with id = profileInformationContainer
        displayProfileInformation(){
            let profileInformationContainer = document.createElement('div');
            profileInformationContainer.setAttribute('id', 'profileInformationContainer');
            profileInformationContainer.appendChild(this.makeDisplayNameHeader());
            profileInformationContainer.appendChild(this.makeEmailHeader());
            profileInformationContainer.appendChild(this.makeFollowersHeader());
            profileInformationContainer.appendChild(this.makeAccountTypeHeader());

            return profileInformationContainer;
        }
            //makes the header that shows the users username with a link to their page
            makeDisplayNameHeader(){
                //creates a link the is directed to the users page
                    let linkToUserPage = document.createElement('a');
                    linkToUserPage.href = this.linkToPage;
                // create a h1 with the users display name
                    let displayNameH1 = document.createElement('h1');
                    displayNameH1.textContent = this.displayName;
                //appends h1 to link
                    linkToUserPage.appendChild(displayNameH1);

                return linkToUserPage;
            }
            // makes the header that shows users email
            makeEmailHeader(){
                const emailH3 = document.createElement('h3');
                emailH3.setAttribute('id', 'userEmailHeader');
                emailH3.textContent = this.userEmail;
                return emailH3;
            }
            //makes the account type header
            makeAccountTypeHeader(){
                let accountTypeP = document.createElement('p');
                accountTypeP.textContent = `Account Type: ${this.accountType}`;
                return accountTypeP;
            }
            //makes the followers header
            makeFollowersHeader(){
                let followersP = document.createElement('p');
                followersP.textContent = `#Followers ${this.numberOfFollowers}`;
                return followersP;
            }
        // container that shows the users favorite music information
        displayFavoriteMusicInformation(songs, artists){
            let favoriteMusicInformationContainer = document.createElement('div');
            favoriteMusicInformationContainer.setAttribute('id', 'favoriteMusicInformationContainer');
            // the form for changing the time range and the amount of songs and artists to display
            favoriteMusicInformationContainer.appendChild(this.favoriteMusicInformationForm());
            // header for top songs
                favoriteMusicInformationContainer.appendChild(this.topSongsHeader());
            // top songs container
                favoriteMusicInformationContainer.appendChild(this.makeTopSongsContainer(songs));
            // header for the top Artists
                favoriteMusicInformationContainer.appendChild(this.topArtistsHeader());
            // top artists container
                favoriteMusicInformationContainer.appendChild(this.makeTopArtistsContainer(artists));

            return favoriteMusicInformationContainer
        }
            // return form that has select elements for the time range and the number of songs and artists
            favoriteMusicInformationForm(){
                let form = document.createElement('form');
                form.setAttribute('id', 'favoriteMusicSearchForm');
                form.appendChild(this.makeContainerForFavoriteMusicSelections());
                /*form.appendChild(this.makeLabel('timeRangeDropDown', 'timeRangeDropDownLabel', 'Time Range'));
                form.appendChild(this.makeFavoriteMusicTimeSelectionDropDown());
                form.appendChild(this.makeLabel('amountOfSongsDropDown', 'amountOfSongsLabel', '# Songs'));
                form.appendChild(this.makeFavoriteMusicAmountOfSongsOrArtistsDropDown('amountOfSongsDropDown'));
                form.appendChild(this.makeLabel('amountOfArtistsDropDown', 'amountOfArtistsLabel', '# Artists'));
                form.appendChild(this.makeFavoriteMusicAmountOfSongsOrArtistsDropDown('amountOfArtistsDropDown'));*/
                form.appendChild(this.makeFavoriteMusicSubmitButton());
                form.addEventListener('submit', this.favoriteMusicFormSubmitEvent.bind(this));
                return form
            }
                // container that holds all the selection elements
                makeContainerForFavoriteMusicSelections(){
                    let container = document.createElement('div');
                    container.setAttribute('id', 'favoriteMusicSelectionsContainer');
                        let timeRange = document.createElement('div');
                        let songs = document.createElement('div');
                        let artists = document.createElement('div');
                            timeRange.appendChild(this.makeLabel('timeRangeDropDown', 'timeRangeDropDownLabel', 'Time Range'));
                            timeRange.appendChild(this.makeFavoriteMusicTimeSelectionDropDown());
                            songs.appendChild(this.makeLabel('amountOfSongsDropDown', 'amountOfSongsLabel', '# Songs'));
                            songs.appendChild(this.makeFavoriteMusicAmountOfSongsOrArtistsDropDown('amountOfSongsDropDown'));
                            artists.appendChild(this.makeLabel('amountOfArtistsDropDown', 'amountOfArtistsLabel', '# Artists'));
                            artists.appendChild(this.makeFavoriteMusicAmountOfSongsOrArtistsDropDown('amountOfArtistsDropDown'));
                        container.appendChild(timeRange);
                        container.appendChild(songs);
                        container.appendChild(artists);
                    return container;
                }
                    // returns select element that has options 5 - 50, and id of the parameter passed.
                    makeFavoriteMusicAmountOfSongsOrArtistsDropDown(id){
                        let dropDown = document.createElement('select');
                        dropDown.setAttribute('id', `${id}`);
                        for(let i = 5; i <= 50; i = i + 5){
                            let option = document.createElement('option');
                            option.setAttribute('value', `${i}`);
                            option.textContent = `${i}`;
                            dropDown.appendChild(option);
                        }
                        return dropDown;
                    }

                    // returns select element that changes the length of time to display favorites
                    makeFavoriteMusicTimeSelectionDropDown(){
                        let dropDown = document.createElement('select');
                        dropDown.setAttribute('id', 'timeRangeDropDown');
                        //making the options
                            let longTermOption = document.createElement('option');
                            longTermOption.setAttribute('value', "long_term");
                            longTermOption.textContent = "All Time";
                            let mediumTermOption = document.createElement('option');
                            mediumTermOption.setAttribute('value', 'medium_term');
                            mediumTermOption.textContent = "6 Months";
                            let shortTermOption = document.createElement('option');
                            shortTermOption.setAttribute('value', 'short_term');
                            shortTermOption.textContent = '1 Month';
                        dropDown.appendChild(longTermOption);
                        dropDown.appendChild(mediumTermOption);
                        dropDown.appendChild(shortTermOption);
                        return dropDown;
                    }
                    // returns a label with the for, id, and text content in the parameters
                    makeLabel(forAttribute, id, textContent){
                        let label = document.createElement('label');
                        label.setAttribute('for', `${forAttribute}`);
                        label.setAttribute('id', `${id}`);
                        label.textContent = textContent;
                        return label;
                    }
                    // return a submit button that for the form for favorite music
                    makeFavoriteMusicSubmitButton(){
                        let button = document.createElement('button');
                        button.setAttribute('type', 'submit');
                        button.setAttribute('id', 'favoriteMusicSubmitButton');
                        button.textContent = 'Display';
                        return button;
                    }
            // returns a container that holds a list of the users top songs
            makeTopSongsContainer(songs){
                let topSongsContainer = document.createElement('div');
                topSongsContainer.setAttribute('id', 'topSongsContainer');

                //creating the list for the songs
                    let listOfSongs = document.createElement('ul');
                    listOfSongs.setAttribute('id', 'usersTopSongsList');
                    let positionOfTopSong = 1;
                    for( let song of songs){
                        let li = document.createElement('li');
                        let nameOfSong = document.createTextNode(`${positionOfTopSong}. ${trimSongName(song.name)}  --  `);
                        li.appendChild(nameOfSong);
                        let nameOfArtist = document.createElement('span');
                        nameOfArtist.setAttribute('class', 'nameOfArtist');
                        nameOfArtist.textContent = song.artists[0].name;
                        li.appendChild(nameOfArtist);
                        listOfSongs.appendChild(li);
                        positionOfTopSong++;
                    }
                topSongsContainer.appendChild(listOfSongs);
                return topSongsContainer;
            }
            //header that says top songs
            topSongsHeader(){
                let header = document.createElement('h1');
                header.setAttribute('id', 'topSongsHeader');
                header.textContent = `Top ${this.lastNumberOfSongs} Songs`;
                return header;
            }
            // returns a container that holds a list of the users top artists
            makeTopArtistsContainer(artists){
                let topArtistsContainer = document.createElement('div');
                topArtistsContainer.setAttribute('id', 'topArtistsContainer');
                let listOfArtists = document.createElement("ul");
                listOfArtists.setAttribute('id', 'usersTopArtistsList');
                let postiionOfTopArtists = 1;
                for ( let artist of artists){
                    let li = document.createElement('li');
                    li.textContent = `${postiionOfTopArtists}. ${artist.name}`;
                    listOfArtists.appendChild(li);
                    postiionOfTopArtists++;
                }
                topArtistsContainer.appendChild(listOfArtists);
                return topArtistsContainer;
            }
            //header that says top artists
            topArtistsHeader(){
                let header = document.createElement('h1');
                header.setAttribute('id', 'topArtistsHeader');
                header.textContent = `Top ${this.lastNumberOfArtists} Artists`;
                return header;
            }
    
    // returns container where you can you can do main funtions of this program
    makeWorkBenchContainer(){
        let workBenchContainer = document.createElement('div');
        workBenchContainer.setAttribute('id', 'workBenchContainer');
        workBenchContainer.appendChild(this.makeWorkBenchContainerTemporaryHeader());
        return workBenchContainer;
    }
        // tempory header
        makeWorkBenchContainerTemporaryHeader(){
            let h1 = document.createElement('h1');
            h1.textContent = 'Work Area';
            return h1;
        }

    // returns container where you can search for a song to play and it displays information about the currently playing song
    makeSearchSongContainer(currentlyPlayingSong){
        let playSongContainer = document.createElement('div');
        playSongContainer.setAttribute('id', 'playSongContainer');

        playSongContainer.appendChild(this.playSongHeader());
        playSongContainer.appendChild(this.searchSongToPlayInput());
        playSongContainer.appendChild(this.currentlyPlayingSongHeader());
        playSongContainer.appendChild(this.playPauseSongIcon());
        playSongContainer.appendChild(this.updateCurrentlyPlayingSongInformationButton());
        playSongContainer.appendChild(this.displayCurrentlyPlayingSongInformation(currentlyPlayingSong));

        return playSongContainer;
    }
        // header that says play song
        playSongHeader(){
            let h1 = document.createElement('h1');
            h1.textContent = 'Search Song';
            return h1;
        }
        // returns text input that is used for user to search for a song to play
        searchSongToPlayInput(){
            let input = document.createElement('input');
            input.setAttribute('id', 'searchSongToPlayInput');
            input.setAttribute('type', 'text');
            return input;
        }
        // header that says currently playing song
        currentlyPlayingSongHeader(){
            let h1 = document.createElement('h1');
            h1.textContent = 'Currently Playing Song';
            return h1;
        }
        // icon that when clicked plays or pauses the currently playing song
        playPauseSongIcon(){
            let icon = document.createElement('img');
            icon.setAttribute('id', 'playPauseSongIcon');
            icon.setAttribute('src', 'icons/pause-play-button.svg');
            return icon;
        }
        // button that is used to update the currently playing song information
        updateCurrentlyPlayingSongInformationButton(){
            let button = document.createElement('button');
            button.textContent = 'Update Information';
            return button;
        }
        // returns div that diplays currently playing song information
        displayCurrentlyPlayingSongInformation(currentlyPlayingSong){
            let div = document.createElement('div');
            div.setAttribute('id', 'currentlyPlayingSongInformationContainer');
            div.appendChild(this.currentlyPlayingSongAlbumCover(currentlyPlayingSong));
            div.appendChild(this.currentlyPlayingSongTitle(currentlyPlayingSong));
            div.appendChild(this.currentlyPlayingSongArtist(currentlyPlayingSong));
            div.appendChild(this.currentlyPlayingSongAlbumName(currentlyPlayingSong));
            div.appendChild(this.currentlyPlayingSongAlbumReleaseDate(currentlyPlayingSong));
            div.appendChild(this.currentlyPlayingSongPopularity(currentlyPlayingSong));
            return div;
        }
            //returns an img of the currently playing songs album cover
            currentlyPlayingSongAlbumCover(currentlyPlayingSong){
                let albumCover = document.createElement('img');
                albumCover.setAttribute('id', 'currentlyPlayingSongAlbumCover');
                albumCover.setAttribute('src', `${currentlyPlayingSong.item.album.images[1].url}`)
                return albumCover
            }
            /* returns a p element that shows the title of the song */
            currentlyPlayingSongTitle(currentlyPlayingSong){
                let p = document.createElement('p');
                //span to hold the title description so we can color it
                let span = document.createElement('span');
                span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                span.textContent = 'Title:  ';
                p.appendChild(span);
                let text = document.createTextNode(`${currentlyPlayingSong.item.name}`);
                p.appendChild(text);
                return p;
            }
            /* returns a pa element that shows the name of the artist that made the song */
            currentlyPlayingSongArtist(currentlyPlayingSong){
                let p = document.createElement('p');
                let span = document.createElement('span');
                span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                let text = document.createTextNode('');
                let artists = currentlyPlayingSong.item.artists;
                if(artists.length <= 1){
                    span.textContent = "Artist:  ";
                    text.textContent = `${artists[0].name}`;
                }else{
                    text.textContent = `${artists[0].name}`;
                    for(let i = 1; i < artists.length; i++){
                        text.textContent += `, ${artists[i].name}`;
                    }
                }
                p.appendChild(span);
                p.appendChild(text);
                return p;
            }
            // returns a paragraph that shows the name of the album
            currentlyPlayingSongAlbumName(currentlyPlayingSong){
                let p = document.createElement('p');
                let span = document.createElement('span');
                span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                span.textContent = 'Album Name:  ';
                let text = document.createTextNode(`${currentlyPlayingSong.item.album.name}`);
                p.appendChild(span);
                p.appendChild(text);
                return p;
            }
            // returns a p element that shows the release date of the album
            currentlyPlayingSongAlbumReleaseDate(currentlyPlayingSong){
                let p = document.createElement('p');
                let span = document.createElement('span');
                span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                span.textContent = 'Release Date:  ';
                let text = document.createTextNode(`${currentlyPlayingSong.item.album.release_date}`);
                p.appendChild(span);
                p.appendChild(text);
                return p;
            }
            // returns a p that shows the popularity of the song
            currentlyPlayingSongPopularity(currentlyPlayingSong){
                let p = document.createElement('p');
                let span = document.createElement('span');
                span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                span.textContent = 'Song Popularity:  ';
                let text = document.createTextNode(`${currentlyPlayingSong.item.popularity}`);
                p.appendChild(span);
                p.appendChild(text);
                return p;
            }





    // uses the URLSearchParams object to save the access and refresh tokens
    saveTokens(){
        let queryString = window.location.search;
        let urlSearchParams = new URLSearchParams(queryString);
        this.accessToken = urlSearchParams.get('access_token');
        this.refreshToken = urlSearchParams.get('refresh_token');
    }
    // gets a refresh token after the access token expires
    getNewAccessToken(token){
        //query string
        let queryString = new URLSearchParams();
        queryString.set('refresh_token', token);
        //crafting the url
        let currentURL = new URL(window.location);
        currentURL.pathname = '/refreshToken';
        currentURL.search = queryString.toString();
        console.log(currentURL.toString());

        window.location = currentURL.toString();
    }


     ///// SPOTIFY API ACCESSORS /////\\\\

    // requests and saves the users profile information
    saveProfileInformation(){
        let profileInformationResponsePromise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.spotify.com/v1/me', true);
            request.onreadystatechange = this.profileInformationResponse.bind(this, request, resolve, reject);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
        });
        return profileInformationResponsePromise;
    }
        // handles the onreadystatechange function for the profile information request
        profileInformationResponse(request, resolve, reject){
            if(request.status == 200 && request.readyState == 4){
                //console.log(`this is the request text : ${request.responseText}`);
                let body = JSON.parse(request.responseText);
                this.displayName = body.display_name;
                this.linkToPage = body.external_urls.spotify;
                this.userEmail = body.email;
                this.accountType = body.product;
                this.numberOfFollowers = body.followers.total;
                resolve(request.responseText);
            }
            else if(request.status == 401 && request.readyState == 4){
               resolve(this.getNewAccessToken(this.refreshToken));
               console.log('needs a new access token')
            }
            else if(request.readyState == 4){
                reject('Bad response from server');
            }
        }

    // returns users paging object of users top numSongs tracks
    getUsersTopSongs(numSongs, timeRange){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${numSongs}`, true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4){
                    let body = JSON.parse(request.responseText);
                    return resolve(body);
                }
                else if(request.status == 401 && request.readyState == 4){
                    this.getNewAccessToken(this.refreshToken);
                }
                else if(request.readyState == 4){return reject('Problem with the server')}
            }
            request.send();
        })
        return promise;
    }
    // returns a promise that on success returns a paging object of users top artists
    getUsersTopArtists(numArtists, timeRange){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${numArtists}`, true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = () => {
                if(request.status == 200 && request.readyState == 4){
                    let body = JSON.parse(request.responseText);
                   // console.log(`Artists ${body}`);
                    return resolve(body);
                }
                else if(request.status == 401 && request.readyState == 4){
                    this.getNewAccessToken(this.refreshToken);
                }
                else if(request.readyState == 4){return reject('Problem with the server')}
            }
            request.send();
        })
        return promise;
    }
    
    //gets the currently playing song
    getCurrentlyPlayingSong(){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.spotify.com/v1/me/player/currently-playing', true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.setRequestHeader('Content-type', 'application/json');
            request.onreadystatechange = () => {
                if(request.readyState == 4 && request.status == 200){
                    let body = request.responseText;
                    body = JSON.parse(body);
                    resolve(body);
                }else if(request.readyState == 4 && request.status == 401){
                    this.getNewAccessToken(this.accessToken);
                }else if(request.readyState == 4){
                    reject('Error');
                }
            }

            request.send()
        })
        return promise;
    }

    ///// EVENTS /////\\\\\
        // submit event for the favorite music form
        favoriteMusicFormSubmitEvent(ev){
            ev.preventDefault();
            let timeRangeDropDown = document.getElementById('timeRangeDropDown');
            let amountOfSongsDropDown = document.getElementById('amountOfSongsDropDown');
            let amountOfArtistsDropDown = document.getElementById('amountOfArtistsDropDown');
            let newTimeRange = timeRangeDropDown.options[timeRangeDropDown.selectedIndex].value;
            let newAmountOfSongs = amountOfSongsDropDown.value;
            let newAmountOfArtists = amountOfArtistsDropDown.value;
            console.log(`${newTimeRange}  ${newAmountOfSongs}  ${newAmountOfArtists}`);

            // promises returned from calling the methods that return songs and artists;
            let songsPromise;
            let artistsPromise;
            if(this.lastNumberOfSongs != newAmountOfSongs || this.lastTimeRange != newTimeRange){
                console.log('songs ran');
                songsPromise = this.getUsersTopSongs(newAmountOfSongs, newTimeRange); 
            }
            if(this.lastNumberOfArtists != newAmountOfArtists || this.lastTimeRange != newTimeRange){
                artistsPromise = this.getUsersTopArtists(newAmountOfArtists, newTimeRange);
            }
            else if(this.lastNumberOfSongs == newAmountOfSongs && this.lastNumberOfSongs == newAmountOfArtists && this.lastTimeRange == newTimeRange){return}

            this.lastTimeRange = newTimeRange;
            this.lastNumberOfSongs = newAmountOfSongs; 
            this.lastNumberOfArtists = newAmountOfArtists;

            let favoriteInformationContainer = document.getElementById('favoriteMusicInformationContainer');
            Promise.all([songsPromise, artistsPromise]).then((values) => {
                // replaces the old top Songs container with the information from the new request
                if(values[0]){
                    favoriteInformationContainer.replaceChild(this.makeTopSongsContainer(values[0].items), document.getElementById('topSongsContainer'));
                    document.getElementById('topSongsHeader').textContent = `Top ${this.lastNumberOfSongs} Songs`;
                }
                // replaces the old top artists container with the information from the new request
                if(values[1]){
                    favoriteInformationContainer.replaceChild(this.makeTopArtistsContainer(values[1].items), document.getElementById('topArtistsContainer'));
                    document.getElementById('topArtistsHeader').textContent = `Top ${this.lastNumberOfArtists} Artists`;
                }
            })


           // document.getElementById('topSongsContainer');
        }
}

profilePage = new ProfilePage();
profilePage.loadPage();




///// FUNCTIONS /////\\\\\\

//gets a song name and trims it
function trimSongName(name){
    let index = name.lastIndexOf('-');
    if(index > 1){
        return name.substring(0, index);
    }
    return name
}

/*    makeRequestForTokens(){
        // gets the response sent in the url after authorization was requested
        let authorizationResponse = this.getRequestedAuthorizationResponse();
        if(authorizationResponse.error){
            //change the path of the url to the homepage
        }
        else{
            this.requestAccessTokens(authorizationResponse.code);
        }
    }

        // gets the information in the url params from the request for authorization
        // returns an object with the code,state, and error
        getRequestedAuthorizationResponse(){
            let result = {};
            let queryString = window.location.search;
            let searchParams = new URLSearchParams(queryString);
            result.code = searchParams.get('code');
            result.state = searchParams.get('state');
            result.error = searchParams.get('error');
            return result;
        }
        
        // gets the access and refresh tokens
        // params : authorization code
        // returns : object with properties accessToken and refreshToken
        requestAccessTokens(code){
            let request = new XMLHttpRequest();
            request.onreadystatechange = this.getAccessTokensFromResponse(request);
            request.open('POST', 'https://accounts.spotify.com/api/token', true);
            //setting the headers
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let body = this.makeAccessTokensRequestBody(code);
            request.send(body);
            

        }
            //gets the access tokens from the response from the server
            getAccessTokensFromResponse(request){
                if(request.readyState == 4 && request.status == 200){
                    console.log(`this is the data send back ${request.responseText}`)
                }
                else{
                    console.log('error processing data from the server');
                }
            }

            // makes the body to send in when making the post request to get the access tokens
            makeAccessTokensRequestBody(code){
                return `grant_type=authorization_code&code=${code}&redirect_uri=${redirecturi}&client_id=${client_Id}&client_secret=${client_Secret}`;
            } */