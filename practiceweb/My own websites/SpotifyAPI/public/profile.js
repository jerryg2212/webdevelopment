
// spotify api keys
/*const client_Id = process.env.CLIENT_ID;
const client_Secret = process.env.CLIENT_SECRET;*/

//const { request } = require("express");

// redirect uri
//const redirecturi = 'http://localhost:8000/callback';
const redirecturi = window.location.href + '/callback';
console.log(window.location);
const profilePageBody = document.getElementById('profilePageBody');



class ProfilePage{
    constructor(){
        this.body = profilePageBody;
        this.saveTokens();
        Promise.all([this.getUsersTopSongs(5, 'long_term'), this.getUsersTopArtists(5, 'long_term'), this.saveProfileInformation(), this.getCurrentlyPlayingSong(), this.spotifyGetDevices()]).then((values) => {this.saveAllInformation(values)}).then(() => {this.makeBody()}).catch((err) => {console.log(err)});
        // profile information
            this.displayName;
            this.linkToPage;
            this.userEmail;
            this.accountType;
            this.numberOfFollowers;
            this.availableDevices;
            this.currentDevice;
            this.currentDeviceName;
        // users top songs and artists
            this.topSongs;
            this.topArtists;
        // variables to keep track of the last displayed information on the favorite music form
            this.lastTimeRange = 'long_term';
            this.lastNumberOfSongs = 5;
            this.lastNumberOfArtists = 5;
        //currently playing Song information
        this.currentlyPlayingSongAlbumCover;
        this.currentlyPlayingSongTitle;
        this.currentlyPlayingSongArtists;
        this.currentlyPlayingSongAlbumName;
        this.currentlyPlayingSongAlbumReleaseDate;
        this.currentlyPlayingSongPopularity;
        this.currentlyPlayingSongId;
        this.currentlyPlayingSongPlayingState;

        //last song the user clicked in the search input
        this.lastSearchedSongId = null;
        this.lastSearchedSongURI = null;

        // holds array of all the things you can do in the workbench
        this.workBenchActionsSelectOptions = [{ name:'    ', action : this.actionsSelectDefault.bind(this)},{name: 'Display All Playlists', action : this.actionsSelectDisplayAllPlaylists.bind(this)}];

    // Event Bindings
        // binding that holds reference to body click event after the error message for the play pause icon shows
        this.playPauseIconErrorMessageBodyClickEventHandler = this.playPauseIconErrorMessageBodyClickEvent.bind(this);
        // binding that holds reference to body click event for when the search song box is visible
        this.searchSongBodyClickEventHandler = this.searchSongBodyClickEvent.bind(this);
        // binding for the li element for the search responses box
        this.searchSongResponsesBoxLiClickEventHandler = this.searchSongResponsesBoxLiClickEvent.bind(this);
        // binding for the queue and next track button
        this.queueAndNextTrackButtonsErrorMessageBodyClickEventHandler = this.queueAndNextTrackButtonsErrorMessageBodyClickEvent.bind(this);
        // binding for the activate device error message body click event
        this.activateDeviceErrorMessageBodyClickEventHandler = this.activateDeviceErrorMessageBodyClickEvent.bind(this);
    }
    loadPage(){
        this.makePage();
    }
    makePage(){
      //  this.makeRequestForTokens();
        //this.displayProfileInformation();
    }
    saveAllInformation(values){
        //top songs and artists
            this.topSongs = values[0].items;
            this.topArtists = values[1].items;
        //profile information
            this.displayName = values[2].display_name;
            this.linkToPage = values[2].external_urls.spotify;
            this.userEmail = values[2].email;
            this.accountType = values[2].product;
            this.numberOfFollowers = values[2].followers.total;
        //currently playing song
        if(values[3] != '' && values[3] != 'Error'){
            this.saveCurrentlyPlayingSongInformation(values[3].item)
        }else{this.currentlyPlayingSongPlayingState = false;}

        // saves the information about the currently active device
        this.saveCurrentlyActiveDeviceInformation(values[4].devices);

    }
        // saves the currently active device information
        saveCurrentlyActiveDeviceInformation(devices){
            console.log(devices);
            this.currentDevice = getCurrentlyActiveDevice(devices);
            console.log(this.currentDevice);
            this.currentDeviceName = this.currentDevice ? this.currentDevice.name : undefined;
        }
        // saves the currently playing song information
        saveCurrentlyPlayingSongInformation(currentSong){
            console.log('saveCurrentlyPlayingSonginformation ran');
            //album cover url
            this.currentlyPlayingSongAlbumCover = currentSong.album.images[1].url;
            this.currentlyPlayingSongTitle = currentSong.name;
            this.currentlyPlayingSongArtists = currentSong.artists;
            this.currentlyPlayingSongAlbumName = currentSong.album.name;
            this.currentlyPlayingSongAlbumReleaseDate = currentSong.album.release_date;
            this.currentlyPlayingSongPopularity = currentSong.popularity;
            this.currentlyPlayingSongId = currentSong.id;
            this.currentlyPlayingSongPlayingState = true;
        }


    async makeBody(){
        //console.log(values[0]);
        // container that shows the users profile information and their favorite songs information
        this.body.appendChild(this.makeUserInformationContainer());
        // container where you can manipulate playlists and carryout other functionality with playlists and sonds
        this.body.appendChild(this.makeWorkBenchContainer());
        // container where you can search a song and play it and displays information about the currently playing song
        this.body.appendChild(this.makeSearchSongContainer());
        //this.body.appendChild(this.displayContainer());
        let t = await this.spotifyGetDevices();
        console.log(t);
    }
    //container that holds the users profile information and the users favorite music information
    makeUserInformationContainer(){
        let userInformationContainer = document.createElement('div');
        userInformationContainer.setAttribute('id', 'userInformationContainer');
            // container that shows the users profile information
                userInformationContainer.appendChild(this.displayProfileInformation());
            // container that shows the users favorite music information
                userInformationContainer.appendChild(this.displayFavoriteMusicInformation());

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
            // makes the label and select element where user selects a device
            makeCurrentDeviceLabelAndSelect(){
                let label = document.createElement('label');
                let text = document.createTextNode('Current Device');
                let select = document.createElement('select');

            }
        // container that shows the users favorite music information
        displayFavoriteMusicInformation(){
            let favoriteMusicInformationContainer = document.createElement('div');
            favoriteMusicInformationContainer.setAttribute('id', 'favoriteMusicInformationContainer');
            // the form for changing the time range and the amount of songs and artists to display
            favoriteMusicInformationContainer.appendChild(this.favoriteMusicInformationForm());
            // header for top songs
                favoriteMusicInformationContainer.appendChild(this.topSongsHeader());
            // top songs container
                favoriteMusicInformationContainer.appendChild(this.makeTopSongsContainer());
            // header for the top Artists
                favoriteMusicInformationContainer.appendChild(this.topArtistsHeader());
            // top artists container
                favoriteMusicInformationContainer.appendChild(this.makeTopArtistsContainer());

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
            makeTopSongsContainer(){
                let topSongsContainer = document.createElement('div');
                topSongsContainer.setAttribute('id', 'topSongsContainer');

                //creating the list for the songs
                    let listOfSongs = document.createElement('ol');
                    listOfSongs.setAttribute('id', 'usersTopSongsList');
                    let positionOfTopSong = 1;
                    for( let song of this.topSongs){
                        let li = document.createElement('li');
                        let nameOfSong = document.createTextNode(`${trimSongName(song.name)}  --  `);
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
            makeTopArtistsContainer(){
                let topArtistsContainer = document.createElement('div');
                topArtistsContainer.setAttribute('id', 'topArtistsContainer');
                let listOfArtists = document.createElement("ol");
                listOfArtists.setAttribute('id', 'usersTopArtistsList');
                let postiionOfTopArtists = 1;
                for ( let artist of this.topArtists){
                    let li = document.createElement('li');
                    li.textContent = `${artist.name}`;
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
        workBenchContainer.appendChild(this.makeWorkBenchNavBarContainer());
        workBenchContainer.appendChild(this.workBenchActionContainer());
        return workBenchContainer;
    }
        // container that holds the select element that the user uses to select somthing to work on
        makeWorkBenchNavBarContainer(){
            let container = document.createElement('div');
            container.setAttribute('id', 'workBenchNavBarContainer');
            container.appendChild(this.workOnLabelAndSelect());
            return container;
        }
        // returns a label that holds a select element that has options of stuff the user can do
        workOnLabelAndSelect(){
            // create the label that will hold the select element
                let label = document.createElement('label');
                label.textContent = 'What would you like to do?';
            // select element
                let select = document.createElement('select');
                select.addEventListener('change', this.workBenchActionsSelectChangeEvent.bind(this));
                for (let action of this.workBenchActionsSelectOptions){
                    let option = document.createElement('option');
                    option.value = action.name;
                    option.textContent = action.name;
                    select.appendChild(option);
                }
            label.appendChild(select);
            return label;
        }
        // container that holds the action
        workBenchActionContainer(){
            let container = document.createElement('div');
            container.setAttribute('id', 'workBenchActionContainer');
            return container;
        }
        // **NOT IN USE    //tempory header
        makeWorkBenchContainerTemporaryHeader(){
            let h1 = document.createElement('h1');
            h1.setAttribute('id', 'workBenchContainerHeader');
            h1.textContent = 'Work Area';
            return h1;
        }

    // returns container where you can search for a song to play and it displays information about the currently playing song
    makeSearchSongContainer(){
        let playSongContainer = document.createElement('div');
        playSongContainer.setAttribute('id', 'playSongContainer');

        playSongContainer.appendChild(this.playSongHeader());
        playSongContainer.appendChild(this.searchSongToPlayInput());
        playSongContainer.appendChild(this.queueAndNextTrackButtonsContainer());
       //playSongContainer.appendChild(this.playSongButton());
       playSongContainer.appendChild(this.activeDeviceDisplayContainer());
        playSongContainer.appendChild(this.currentlyPlayingSongHeader());
        playSongContainer.appendChild(this.playPauseSongIcon());
        playSongContainer.appendChild(this.updateCurrentlyPlayingSongInformationButton());
        if(this.currentlyPlayingSongPlayingState){
                    playSongContainer.appendChild(this.displayCurrentlyPlayingSongInformation());
        }

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
            input.addEventListener('input', this.searchSongInputEvent.bind(this));
            input.setAttribute('type', 'text');
            return input;
        }
            // when user searches songs this box will be made and populated with response
            makeSearchSongResponsesBox(tracks){
                //if their are no tracks populate track with default value
                if(tracks.length == 0){
                    tracks.push({name: 'No suggestions', artists: [{name: null}], id : null})
                }
                //input element and its positions
                    let input = document.getElementById('searchSongToPlayInput');
                    let inputPosition = input.getBoundingClientRect();
                    //styles for the box container so it can be positioned properly
                    let boxStyles = {
                        top : `${inputPosition.bottom + window.scrollY}px`,
                        left : `${inputPosition.left + 15}px`,
                        width : `${inputPosition.width - 30}px`
                    }
                let box = document.createElement('div');
                let list = document.createElement('ul');
                list.setAttribute('id', 'searchSongResponsesList');
                box.setAttribute('id', 'searchSongResponsesBox');
                for( let track of tracks){
                    let id = track.id;
                    let name = track.name;
                    let artist = track.artists[0].name;
                    let li = document.createElement('li');
                    let text = document.createTextNode(`${name} - `);
                    let span = document.createElement('span');
                    span.setAttribute('class', 'italics');
                    span.textContent = `${artist}`;
                    li.name = name;
                    li.artist = artist;
                    li.songId = id;
                    li.uri = track.uri;
                    li.appendChild(text);
                    li.appendChild(span);
                    li.addEventListener('click', this.searchSongResponsesBoxLiClickEventHandler);
                    list.appendChild(li);
                }
                Object.assign(box.style, boxStyles);
                box.appendChild(list);
                return box;
            }
        // container that holds the queue song and next track button
        queueAndNextTrackButtonsContainer(){
            let container = document.createElement('div');
            container.setAttribute('id', 'queueAndNextTrackButtonsContainer');
            container.appendChild(this.makeQueueSongButton());
            container.appendChild(this.makeNextTrackButton());
            return container;
        }
            // makes the queue button
            makeQueueSongButton(){
                let button = document.createElement('button');
                button.textContent = 'Queue';
                button.setAttribute('id', 'queueSongButton');
                button.setAttribute('class', 'playSongContainerButton');
                button.addEventListener('click', this.queueButtonClickEvent.bind(this));
                return button;
            }
            //makes the next track button
            makeNextTrackButton(){
                let button = document.createElement('button');
                button.textContent = 'Next Track';
                button.setAttribute('id', 'nextTrackButton');
                button.setAttribute('class', 'playSongContainerButton');
                button.addEventListener('click', this.nextTrackButtonClickEvent.bind(this));
                return button
            }
                
        // returns a button that when clicked will play the song in the user wants
        playSongButton(){
            let button = document.createElement('button');
            button.setAttribute('class', 'playSongContainerButton');
            button.setAttribute('id', 'playSongContainerButton');
            button.textContent = 'Play Song';
            button.addEventListener('click', this.playSongButtonClickEvent.bind(this), false);
            return button;
        }
            // error message if user does not have premium
            playSongButtonErrorMessage(){
                let p = document.createElement('p');
                p.textContent = 'This feature does not work without a premium account';
            }
        // container that holds the information about the active device
        activeDeviceDisplayContainer(){
            let div = document.createElement('div');
            div.setAttribute('id', 'activeDeviceDisplayContainer');
            div.appendChild(this.makeActiveDeviceNameP());
            return div;
        }
            //updates the active device container if there is one
            updateActiveDeviceDisplayContainer(){
                if(document.getElementById('activeDeviceDisplayContainer')){
                    document.getElementById('activeDeviceDisplayContainer').remove();
                }
                let div = document.createElement('div');
                div.setAttribute('id', 'activeDeviceDisplayContainer');
                div.appendChild(this.makeActiveDeviceNameP());
                document.getElementById('playSongContainer').insertBefore(div, document.getElementById('currentlyPlayingSongHeader'));
            }
            // paragraph that holds the name of the active device
            makeActiveDeviceNameP(){
                let p = document.createElement('p');
                //span that holds the title of the name of the active device
                    let span = document.createElement('span');
                    span.classList.add('currentlyPlayingSongDescriptionTitle');
                    span.textContent = 'Active Device -  ';
                p.appendChild(span);
                // text node to hold the actual name of the current device or a link to activate a device
                    let name = (this.currentDeviceName) ? this.currentDeviceName : 'Activate';
                    let text = document.createElement('span');
                    let link = document.createElement('a');
                    link.setAttribute('href', this.linkToPage);
                    link.textContent = name;
                    text.appendChild(link);
                    text.classList.add('italics')
                    text.classList.add('lightblueFont');
                p.appendChild(text);
                return p;
            }
        // header that says currently playing song
        currentlyPlayingSongHeader(){
            let h1 = document.createElement('h1');
            h1.setAttribute('id', 'currentlyPlayingSongHeader');
            h1.textContent = 'Currently Playing Song';
            return h1;
        }
        // icon that when clicked plays or pauses the currently playing song
        playPauseSongIcon(){
            let icon = document.createElement('img');
            icon.setAttribute('id', 'playPauseSongIcon');
            icon.setAttribute('src', 'icons/pause-play-button.svg');
            icon.addEventListener('click', this.playPauseSongIconClickEvent.bind(this));
            addStyleToStyleSheet('#playPauseSongIcon:hover {cursor: pointer;}')
            return icon;
        }
            // error message that is display 
            // when the user clicks on the icon but does not have premium
            playPauseIconErrorMessage(){
                let errorMessage = document.createElement('p');
                errorMessage.setAttribute('id', 'playPauseIconErrorMessage');
                errorMessage.textContent = `This feature does not work without a premium account`;
                document.getElementById('playSongContainer').insertBefore(errorMessage, document.getElementById('updateCurrentlyPlayingSongInformationButton'));
                // adds a one time click event to the body that gets rid of the error message
                document.body.addEventListener('click', this.playPauseIconErrorMessageBodyClickEventHandler, true);
            }
            // button that is used to update the currently playing song information
        updateCurrentlyPlayingSongInformationButton(){
            let button = document.createElement('button');
            button.setAttribute('class', 'playSongContainerButton');
            button.setAttribute('id', 'updateCurrentlyPlayingSongInformationButton');
            button.textContent = 'Update Information';
            // adding click event so it updates the current song if it switches
            button.addEventListener('click', this.updateCurrentlyPlayingSongClickEvent.bind(this));
            return button;
        }
        // returns div that diplays currently playing song information
        displayCurrentlyPlayingSongInformation(){
            let div = document.createElement('div');
            div.setAttribute('id', 'currentlyPlayingSongInformationContainer');
            div.appendChild(this.makeCurrentlyPlayingSongAlbumCover());
            div.appendChild(this.makeCurrentlyPlayingSongFactsContainer());
            /*div.appendChild(this.makeCurrentlyPlayingSongTitle());
            div.appendChild(this.makeCurrentlyPlayingSongArtist());
            div.appendChild(this.makeCurrentlyPlayingSongAlbumName());
            div.appendChild(this.makeCurrentlyPlayingSongAlbumReleaseDate());
            div.appendChild(this.makeCurrentlyPlayingSongPopularity());*/
            return div;
        }
            //returns an img of the currently playing songs album cover
            makeCurrentlyPlayingSongAlbumCover(){
                let albumCover = document.createElement('img');
                albumCover.setAttribute('id', 'currentlyPlayingSongAlbumCover');
                albumCover.setAttribute('src', `${this.currentlyPlayingSongAlbumCover}`)
                return albumCover
            }
            /* container that holds all the p elements that display the facts of the currently playing song */
            makeCurrentlyPlayingSongFactsContainer(){
                let div = document.createElement('div');
                div.setAttribute('id', 'currentlyPlayingSongFactsContainer');
                div.appendChild(this.makeCurrentlyPlayingSongTitle());
                div.appendChild(this.makeCurrentlyPlayingSongArtist());
                div.appendChild(this.makeCurrentlyPlayingSongAlbumName());
                div.appendChild(this.makeCurrentlyPlayingSongAlbumReleaseDate());
                div.appendChild(this.makeCurrentlyPlayingSongPopularity());
                return div
            }
                /* returns a p element that shows the title of the song */
                makeCurrentlyPlayingSongTitle(){
                    let p = document.createElement('p');
                    //span to hold the title description so we can color it
                    let span = document.createElement('span');
                    span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                    span.textContent = 'Title:  ';
                    p.appendChild(span);
                    let text = document.createTextNode(`${this.currentlyPlayingSongTitle}`);
                    p.appendChild(text);
                    return p;
                }
                /* returns a pa element that shows the name of the artist that made the song */
                makeCurrentlyPlayingSongArtist(){
                    let p = document.createElement('p');
                    let span = document.createElement('span');
                    span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                    let text = document.createTextNode('');
                    let artists = this.currentlyPlayingSongArtists;
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
                makeCurrentlyPlayingSongAlbumName(){
                    let p = document.createElement('p');
                    let span = document.createElement('span');
                    span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                    span.textContent = 'Album Name:  ';
                    let text = document.createTextNode(`${this.currentlyPlayingSongAlbumName}`);
                    p.appendChild(span);
                    p.appendChild(text);
                    return p;
                }
                // returns a p element that shows the release date of the album
                makeCurrentlyPlayingSongAlbumReleaseDate(){
                    let p = document.createElement('p');
                    let span = document.createElement('span');
                    span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                    span.textContent = 'Release Date:  ';
                    let text = document.createTextNode(`${this.currentlyPlayingSongAlbumReleaseDate}`);
                    p.appendChild(span);
                    p.appendChild(text);
                    return p;
                }
                // returns a p that shows the popularity of the song
                makeCurrentlyPlayingSongPopularity(){
                    let p = document.createElement('p');
                    let span = document.createElement('span');
                    span.setAttribute('class', 'currentlyPlayingSongDescriptionTitle');
                    span.textContent = 'Song Popularity:  ';
                    let text = document.createTextNode(`${this.currentlyPlayingSongPopularity}`);
                    p.appendChild(span);
                    p.appendChild(text);
                    return p;
                }




    // COMMON FUNCITONS FOR ALL SECTIONS 
    displayActivateDeviceErrorMessage(){
        document.body.appendChild(this.activateDeviceErrorMessageContainer());
        document.body.addEventListener('click', this.activateDeviceErrorMessageBodyClickEventHandler, true);
    }
        // container that holds the error message for when the user needs to activate a device
        activateDeviceErrorMessageContainer(){
            let div = document.createElement('div');
            div.setAttribute('id', 'activateDeviceErrorMessageContainer');
            div.appendChild(this.activateDeviceErrorMessageExitIcon());
            div.appendChild(this.activateDeviceErrorMessageHeader());
            let styles = {
                top: `${window.pageYOffset + 100}px`,
                left: `${window.screen.width / 2 - 200}px`
            }
            Object.assign(div.style, styles);
            return div;
        }
            // exit icon
            activateDeviceErrorMessageExitIcon(){
                let img = document.createElement('img');
                img.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    document.getElementById('activateDeviceErrorMessageContainer').remove();
                    document.body.removeEventListener('click', this.activateDeviceErrorMessageBodyClickEventHandler, true);
                }, false);
                img.setAttribute('id', 'activateDeviceErrorMessageExitIcon');
                img.setAttribute('src', 'icons/exit.svg');
                return img;
            }  
            // header 
            activateDeviceErrorMessageHeader(){
                let p = document.createElement('p');
                let text = document.createTextNode('To use this feature you must activate a device. To activate a device you must play a song on ');
                let link = document.createElement('a');
                link.textContent = 'your spotify account';
                link.setAttribute('href', this.linkToPage);
                p.appendChild(text);
                p.appendChild(link);
                return p
            } 




    // END OF COMMON FUNCTIONS FOR ALL SECTIONS





    // uses the URLSearchParams object to save the access and refresh tokens
    saveTokens(){
        let queryString = window.location.search;
        let urlSearchParams = new URLSearchParams(queryString);
        this.accessToken = urlSearchParams.get('access_token');
        console.log(this.accessToken);
        this.refreshToken = urlSearchParams.get('refresh_token');
        console.log(this.refreshToken);
    }
    // gets a refresh token after the access token expires
    getNewAccessToken(token){
        console.log(`get access token ran and this is the refresh token ${token}`);
        //query string
        let queryString = new URLSearchParams();
        queryString.set('refresh_token', token);
        //crafting the url
        let currentURL = new URL(window.location);
        currentURL.pathname = '/refreshToken';
        currentURL.search = queryString.toString();
        console.log(currentURL.toString());
        //access token is undefined because the last time this method was called spotify did not give us another one
        if(token == undefined){
            console.log('there is no token')
            currentURL.pathname = '/';
            currentURL.search = '';
            window.location = currentURL.toString();
        }
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
                /*this.displayName = body.display_name;
                this.linkToPage = body.external_urls.spotify;
                this.userEmail = body.email;
                this.accountType = body.product;
                this.numberOfFollowers = body.followers.total;
                resolve(request.responseText);*/
                resolve(body);
            }
            else if(request.status == 401 && request.readyState == 4){
               resolve(this.getNewAccessToken(this.refreshToken));
               console.log('needs a new access token')
            }
            else if(request.readyState == 4){
                console.log('profile information rejects');
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
                if(request.status == 204){
                    resolve('');
                }
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

    // adds a song to queue
    // parameters : uri of the song
    spotifyAddSongToQueue(uri){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('POST', `https://api.spotify.com/v1/me/player/queue?uri=${uri}`, true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.onreadystatechange = () => {
                if(request.readyState == 4){
                    if(request.status == 204) {
                        resolve()
                    }
                    if(request.status == 401){
                        this.getNewAccessToken(this.refreshToken);
                        resolve();
                    }
                    if(request.status == 403){
                        reject();
                    }else{reject()}
                }
            }
            request.send();
        })
        return promise;
    }

    // skips to the next song in queue
    spotifySkipToNextSong(){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('POST', 'https://api.spotify.com/v1/me/player/next', true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.onreadystatechange = () => {
                if(request.readyState == 4){
                    if(request.status == 204){
                        console.log('skipped');
                        resolve();
                    }
                    if(request.status == 401){
                        this.getNewAccessToken(this.accessToken);
                        resolve();
                    }
                    if(request.status == 403){
                        reject();
                    }else{ resolve()}
                }
            }
            request.send();
        })
        return promise;
    }

    // gets all users current available devices
    spotifyGetDevices(){
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'https://api.spotify.com/v1/me/player/devices', true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.onreadystatechange = () => {
                if(request.readyState == 4){
                    if(request.status == 200){
                        resolve(JSON.parse(request.responseText));
                    }
                    if(request.status == 401){
                        this.getNewAccessToken(this.refreshToken);
                    }
                    else{reject('could not get devices')}
                }
            }
            request.send();
        })

        return promise;

    }

    // gets users playlists
    // parameters limit = number of playlists to return max 50 offset = number playlist to start searching from
    spotifyGetPlaylists(limit = 50, offset = 0){
        // limit cannot be over 50
        if(limit > 50){return}
        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', `https://api.spotify.com/v1/me/playlists?limit=${limit}&offset=${offset}`, true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
            request.onreadystatechange = () => {
                if(request.readyState == 4){
                    if(request.status == 200){
                        resolve(request.responseText);
                    }
                    else if(request.status == 401){
                        this.getNewAccessToken(this.refreshToken(this.refreshToken));
                        resolve('');
                    }
                    else{reject('error getting playlists');}
                }
            }
            request.send();
        })
        return promise;
    }



    ///// EVENTS /////\\\\\

    // USER INFORMATION CONTAINER
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
                    this.topSongs = values[0].items
                    favoriteInformationContainer.replaceChild(this.makeTopSongsContainer(), document.getElementById('topSongsContainer'));
                    document.getElementById('topSongsHeader').textContent = `Top ${this.lastNumberOfSongs} Songs`;
                }
                // replaces the old top artists container with the information from the new request
                if(values[1]){
                    this.topArtists = values[1].items;
                    favoriteInformationContainer.replaceChild(this.makeTopArtistsContainer(), document.getElementById('topArtistsContainer'));
                    document.getElementById('topArtistsHeader').textContent = `Top ${this.lastNumberOfArtists} Artists`;
                }
            })


           // document.getElementById('topSongsContainer');
        }


    // END USER INFORMATION CONTAINER EVENTS



    // WORK BENCH CONTAINER EVENTS


        // change event for the actions select element
        workBenchActionsSelectChangeEvent(ev){
            let actionValue = ev.target.value;
            for (const action of this.workBenchActionsSelectOptions){
                if(actionValue == action.name){
                    action.action();
                }
            }
            

        }



    // END WORK BENCH CONTAINER EVENTS



    // PLAY SONG CONTAINER EVENTS

        //click event for the update currently playing song button 
        async updateCurrentlyPlayingSongClickEvent(ev){
            // updates information regarding the current device
            this.updateActiveDeviceDisplayContainer();
                //saving the current device if any
                let devices = await this.spotifyGetDevices();
                this.saveCurrentlyActiveDeviceInformation(devices.devices);
                if(this.currentDevice == undefined){
                    this.displayActivateDeviceErrorMessage();

                }

            
            let oldCurrentlyPlayingSongInformation = document.getElementById('currentlyPlayingSongInformationContainer');
            let currentSong = await this.getCurrentlyPlayingSong();
            // no currently playing song so either do nothing or delete the old information
            if(currentSong == '' || currentSong == 'Error'){
                console.log('empty');
                if(oldCurrentlyPlayingSongInformation){
                    oldCurrentlyPlayingSongInformation.remove();
                }
            }
            // new song
            else{
                if(this.currentlyPlayingSongId == currentSong.item.id && oldCurrentlyPlayingSongInformation){
                    console.log('ids are the same');
                    return
                }
                else{
                    console.log('new song');
                    this.saveCurrentlyPlayingSongInformation(currentSong.item);
                    if(oldCurrentlyPlayingSongInformation){
                        oldCurrentlyPlayingSongInformation.remove();
                    }
                    document.getElementById('playSongContainer').appendChild(this.displayCurrentlyPlayingSongInformation());
                }
            }
        }

        // click event for the play pause icon
        async playPauseSongIconClickEvent(ev){
            /*// if there is no currently active device
            if(!this.currentDevice){
                this.displayActivateDeviceErrorMessage();
            }*/
            let currentSong = await this.getCurrentlyPlayingSong();
            // if their is a current song
            if(currentSong){
                
                let request = new XMLHttpRequest();
                // if the current song is playing we want to set the request to pause it
                if(currentSong.is_playing){
                    request.open('PUT', 'https://api.spotify.com/v1/me/player/pause', true);
                } 
                // song is pause so we want to set the request to play
                else{
                    request.open('PUT', 'https://api.spotify.com/v1/me/player/play', true);
                }
                request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
                request.onreadystatechange = () => {
                    if(request.readyState == 4){
                        if(request.status == 204){
                            return;
                        }
                        if(request.status == 403){
                            this.playPauseIconErrorMessage();
                        }
                        if(request.status == 401){
                            this.getNewAccessToken(this.refreshToken);
                        }
                    }
                }
                request.send();
            }
        }
            // click event for the body after the play pause icon error message is shown
            playPauseIconErrorMessageBodyClickEvent(ev){
                document.body.removeEventListener('click', this.playPauseIconErrorMessageBodyClickEventHandler, true);
                ev.stopPropagation();
                console.log('play pause icon body click event ran');
                document.getElementById('playPauseIconErrorMessage').remove();

            }

        // search song input event
        searchSongInputEvent(ev){
            let value = ev.target.value;
            
            //making the request
            let request = new XMLHttpRequest();
            let url = 'https://api.spotify.com/v1/search?'
            url += `q=${value}&type=track&limit=5`;
            request.open('GET', url, true);
            request.setRequestHeader('Authorization', `Bearer ${this.accessToken}`);
                request.onreadystatechange = () => {
                    if(request.readyState == 4){
                        if(request.status == 200){
                            let tracks = JSON.parse(request.responseText);
                            tracks = tracks.tracks.items;
                            let box;
                            if(box = document.getElementById('searchSongResponsesBox')){
                                box.remove();
                            }
                            document.getElementById('playSongContainer')
                            .insertBefore(this.makeSearchSongResponsesBox(tracks),document.getElementById('playSongContainerButton'));
                            document.body.addEventListener('click', this.searchSongBodyClickEventHandler, true );
                        }
                        if(request.status == 401){
                            this.getNewAccessToken(this.accessToken);
                        }
                        else{return}
                    }
                }
            request.send();
        }
            //click event for the body that when user clicks the input box closes
            searchSongBodyClickEvent(ev){
                let input = document.getElementById('searchSongToPlayInput');
                let searchResponsesBox = document.getElementById('searchSongResponsesBox');
                // getting the locations of the search responses box and the input element
                    let inputBounding = input.getBoundingClientRect();
                        let inputTop = inputBounding.y;
                        let inputRight = inputBounding.x + inputBounding.width;
                        let inputBottom = inputBounding.y + inputBounding.height;
                        let inputLeft = inputBounding.x;
                    let boxBounding = searchResponsesBox.getBoundingClientRect();
                        let boxTop = boxBounding.y;
                        let boxRight = boxBounding.x + boxBounding.width;
                        let boxBottom = boxBounding.y + boxBounding.height;
                        let boxLeft = boxBounding.x;
                    // combining the area of the two elements
                        let totalTop = inputTop;
                        let totalBottom = boxBottom;
                        let totalRight = Math.max(boxRight, inputRight);
                        let totalLeft = Math.min(boxLeft, inputLeft);
                // if click is outside both input and search box remove the search box and body listener
                if(ev.clientX > totalRight || ev.clientX < totalLeft || ev.clientY < totalTop || ev.clientY > totalBottom ){
                    this.body.removeEventListener('click', this.searchSongBodyClickEventHandler, true);
                    document.getElementById('searchSongResponsesBox').remove();
                    input.value = '';
                    this.lastSearchedSongId = null;
                    this.lastSearchedSongURI = null;
                }
            }

            // click event for the li elements in the search resposnes box
            // when clicked with will load the name of the song and album in the input box
            searchSongResponsesBoxLiClickEvent(ev){
                let input = document.getElementById('searchSongToPlayInput');
                ev.stopPropagation();
                //saving the clicked song information
                    let songName = ev.currentTarget.name;
                    let songArtist = ev.currentTarget.artist;
                    this.lastSearchedSongId = ev.currentTarget.songId;
                    this.lastSearchedSongURI = ev.currentTarget.uri;
                //changing the value of the input to the clicked song
                input.value = `${songName} - ${songArtist}`;
                document.getElementById('searchSongResponsesBox').remove();
                this.body.removeEventListener('click', this.searchSongBodyClickEventHandler, true);
            }

        // click event for the play song button
        // it gets the song in the input box and plays it
        playSongButtonClickEvent(ev){
            // if user does not have premium then return and send error message
            if(this.accountType != 'premium'){
                this.playSongButtonErrorMessage();
            }
            console.log(this.lastSearchedSongId);
            // add the song to queue
            this.spotifyAddSongToQueue(this.lastSearchedSongURI);
            this.spotifySkipToNextSong();
            this.lastSearchedSongId = null;
            this.lastSearchedSongURI = null;
            document.getElementById('searchSongToPlayInput').value = '';
        }

        // click event for the queue button that adds a song to the queue
        async queueButtonClickEvent(ev){
            //saves current devices if any
            let devices = await this.spotifyGetDevices();
            this.saveCurrentlyActiveDeviceInformation(devices.devices);
            // if there is no currently active device
            if(!this.currentDevice){
                this.displayActivateDeviceErrorMessage();
            }
            // if there is no last searched song return
            if(this.lastSearchedSongURI == null){return}

            try{
            await this.spotifyAddSongToQueue(this.lastSearchedSongURI);
            }
            catch(err){
                let error = new ErrorMessage('This feature does not work without a premium account', 'queueAndNextTrackButtonsErrorMessage');
                error.insertBefore(document.getElementById('playSongContainer'), document.getElementById('currentlyPlayingSongHeader'));
                document.body.addEventListener('click', this.queueAndNextTrackButtonsErrorMessageBodyClickEventHandler, true);
            }
            finally{
                this.lastSearchedSongURI = null;
                document.getElementById('searchSongToPlayInput').value = '';
            }
        }
        // click event for the next track button
        async nextTrackButtonClickEvent(ev){
            //saves current devices if any
            let devices = await this.spotifyGetDevices();
            this.saveCurrentlyActiveDeviceInformation(devices.devices);
            // if there is no currently active device
            if(!this.currentDevice){
                this.displayActivateDeviceErrorMessage();
            }



            try{
                await this.spotifySkipToNextSong();
                let oldCurrentlyPlayingSongInformation = document.getElementById('currentlyPlayingSongInformationContainer');
               // let currentSong;
               //using set timeout so spotify has time to switch songs
                setTimeout( async () => {
                    let currentSong;
                    currentSong = await this.getCurrentlyPlayingSong();
                    if(currentSong == '' || currentSong == 'Error'){
                        console.log('empty');
                        if(oldCurrentlyPlayingSongInformation){
                            oldCurrentlyPlayingSongInformation.remove();
                        }
                    }
                    // new song
                    else{
                        if(this.currentlyPlayingSongId == currentSong.item.id && oldCurrentlyPlayingSongInformation){
                            console.log('ids are the same');
                            return
                        }
                        else{
                            console.log('new song');
                            this.saveCurrentlyPlayingSongInformation(currentSong.item);
                            if(oldCurrentlyPlayingSongInformation){
                                oldCurrentlyPlayingSongInformation.remove();
                            }
                            document.getElementById('playSongContainer').appendChild(this.displayCurrentlyPlayingSongInformation());
                        }
                    }
                }, 300);
            }
            catch(err){
                console.log('it caught the error');
                let error = new ErrorMessage('This feature does not work without a premium account', 'queueAndNextTrackButtonsErrorMessage');
                error.insertBefore(document.getElementById('playSongContainer'), document.getElementById('currentlyPlayingSongHeader'));
                document.body.addEventListener('click', this.queueAndNextTrackButtonsErrorMessageBodyClickEventHandler, true);
            }
        }
            // error message for the queue and next track button click events
            queueAndNextTrackButtonsErrorMessageBodyClickEvent(ev){
                ev.stopPropagation();
                document.getElementById('queueAndNextTrackButtonsErrorMessage').remove();
                document.body.removeEventListener('click', this.queueAndNextTrackButtonsErrorMessageBodyClickEventHandler, true);
            }



    // COMMON EVENTS /////
        activateDeviceErrorMessageBodyClickEvent(ev){
            // the div element that holds the error message
            let messageContainer = document.getElementById('activateDeviceErrorMessageContainer');
            // if the user clicks the exit icon do not stop the propagation so the icons click event runs
            if(ev.target.id != 'activateDeviceErrorMessageExitIcon'){
                ev.stopPropagation();
            }
            // if user clicks inside the error container do nothing,
            // if user clicks outside the error container remove it 
            let loc = messageContainer.getBoundingClientRect();
            if(ev.clientX > loc.left && ev.clientX < loc.right && ev.clientY > loc.top && ev.clientY < loc.bottom){
                return;
            }
            messageContainer.remove();
            document.body.removeEventListener('click', this.activateDeviceErrorMessageBodyClickEventHandler, true);
            

        }
    
    ///// END OF EVENTS /////


    ///// ACTIONS SELECT ELEMENT OPTION FUNCTIONS /////

        // for the default
        actionsSelectDefault(){
            document.getElementById('workBenchActionContainer').innerHTML = '';
        }
        // for the display all playlists option
        async actionsSelectDisplayAllPlaylists(){
            console.log(this);
            let playlists = await this.spotifyGetPlaylists();
            playlists = JSON.parse(playlists);
            console.log(playlists);
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

// adds a css string to the style sheet
function addStyleToStyleSheet(css){
    let style = document.createElement('style');
    if(style.styleSheet){
        style.styleSheet.cssText = css;
    }else{
        style.appendChild(document.createTextNode(css));
    }
    document.querySelector('head').appendChild(style);
}

// given an array of devices it returns the device object that is currently active
function getCurrentlyActiveDevice(devices){
    if(devices.length > 0){
        for(let device of devices){
            if(device.is_active){
                return device
            }
        }
    }
    return undefined;
}
