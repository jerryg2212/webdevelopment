
class userInformationContainer{
    constructor(){

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
                        let listOfSongs = document.createElement('ul');
                        listOfSongs.setAttribute('id', 'usersTopSongsList');
                        let positionOfTopSong = 1;
                        for( let song of this.topSongs){
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
                makeTopArtistsContainer(){
                    let topArtistsContainer = document.createElement('div');
                    topArtistsContainer.setAttribute('id', 'topArtistsContainer');
                    let listOfArtists = document.createElement("ul");
                    listOfArtists.setAttribute('id', 'usersTopArtistsList');
                    let postiionOfTopArtists = 1;
                    for ( let artist of this.topArtists){
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


    ///// EVENTS /////
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