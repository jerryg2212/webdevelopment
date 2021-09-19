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

exports.spotifyAPIRequestPost = (requestURL, accessToken) => {
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
        request.send();
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

// function that given user id makes a request to server that returns users song bank or error
exports.addSongToSongBankRequest = (userId, songUri) => {
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
        request.open('GET', `/api/addSongToSongBank?userId=${userId}&songUri=${songUri}`, true);
        request.send();
    })
    return response
}


// function given spotify api song trims down the name into display format
exports.trimSongName = (name) => {
    let index = name.lastIndexOf('-');
    if(index > 1){
        return name.substring(0, index);
    }
    return name
}
