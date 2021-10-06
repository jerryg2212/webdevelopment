const { default: axios } = require("axios");

exports.stringifyScopes = function(Scopes){
    let result = '';
    for(let scope in Scopes){
        result += ` ${Scopes[scope]}`
    }
    return result;
}


exports.spotifyAPIRequest = (requestURL, accessToken) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", requestURL, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4){
                if(request.status > 199 && request.status < 299){
                   // console.log(`the responseText is ${request.responseText} and the response is ${request.response}`);
                    resolve(request.responseText);
                }else{
                    //console.log(request.resopnseText);
                    reject(request);
                }
            }
        }
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
    })
    return response;
}

exports.spotifyAPIRequestPost = (requestURL, accessToken, requestBody = {}) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", requestURL, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4){
                if(request.status > 199 && request.status < 299){
                   // console.log(`the responseText is ${request.responseText} and the response is ${request.response}`);
                    resolve(request.responseText);
                }else{
                    //console.log(request.resopnseText);
                    reject(request);
                }
            }
        }
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('Content-type', 'application/json');
        console.log(requestBody);
        request.send(requestBody);
    })
    return response;
}
// put request to spotify api
exports.spotifyAPIRequestPut = (requestURL, accessToken) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("PUT", requestURL, true);
        request.onreadystatechange = () => {
            if(request.readyState === 4){
                if(request.status > 199 && request.status < 299){
                   // console.log(`the responseText is ${request.responseText} and the response is ${request.response}`);
                    resolve(request.responseText);
                }else{
                    //console.log(request.resopnseText);
                    reject(request);
                }
            }
        }
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
    })
    return response;
}

// function that given user id makes a request to server that adds a song to users song bank or error
exports.addSongToSongBankRequest = (userId, songId) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState == 4){
                console.log(`server response from song bank request ${request.responseText}`);
                if(request.status != 410){
                    resolve(request.responseText)
                }else{
                    console.log('rejected');
                    reject(request)
                }
            }

        }
        request.open('GET', `/api/addSongToSongBank?userId=${userId}&songId=${songId}`, true);
        request.send();
    })
    return response
}
// function that given userId makes a request to server that returns the users songbank
exports.getSongsFromSongBankRequest = (userId) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState == 4){
                console.log(`server response from song bank request ${request.responseText}`);
                if(request.status != 410){
                    resolve(request.responseText)
                }else{
                    console.log('rejected');
                    reject(request)
                }
            }

        }
        request.open('GET', `/api/getSongsFromSongBank?userId=${userId}`, true);
        request.send();
    })
    return response
}
// function that given userId makes a request to server and deletes the specified songs from the users song bank
    // userId = users spotify userId
    // deletableSongs = array of ids of songs to be deleted from the songBank in the database
exports.deleteSongsFromSongBankRequest = (userId, deleteableSongs) => {
    let response = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState == 4){
                if(request.status != 410){
                    resolve(request.responseText)
                }else{
                    console.log('rejected');
                    reject(request)
                }
            }

        }
        let deleteableSongsString = deleteableSongs.join(',');
        console.log(`this is the deleteableSongsString ${deleteableSongsString}`);
        request.open('GET', `/api/deleteSongsFromSongBank?userId=${userId}&deleteableSongs=${deleteableSongsString}`, true);
        request.send();
    })
    return response
}

// returns the number of columns wanted based on how many songs their are in the active playlist
// parameters
    // amountOfSongs = the amount of songs that are to be displayed
exports.amountOfColumns = function(amountOfSongs){
        return  Math.min(Math.ceil(amountOfSongs / 40), 3);
    }

// function that given an array of song ids returns the url needed to request to spotify to receive the list of tracks
exports.getSongsRequestUrl = function(songs){
    let baseUrl = 'https://api.spotify.com/v1/tracks?ids=';
    for(let song of songs){
        baseUrl += `${song},`;
    }
    baseUrl = baseUrl.slice(0, -1);
    return baseUrl
}


// function given spotify api song trims down the name into display format
exports.trimSongName = (name) => {
    let index = name.lastIndexOf('-');
    if(index > 1){
        return name.substring(0, index);
    }
    return name
}
