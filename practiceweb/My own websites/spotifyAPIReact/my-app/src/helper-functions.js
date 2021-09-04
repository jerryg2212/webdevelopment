
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
                if(request.status == 200){
                   // console.log(`the responseText is ${request.responseText} and the response is ${request.response}`);
                    resolve(request.responseText);
                }else{
                    reject(request.responseText);
                }
            }
        }
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
    })
    return response;
}

// function given spotify api song trims down the name into display format
exports.trimSongName = (name) => {
    let index = name.lastIndexOf('-');
    if(index > 1){
        return name.substring(0, index);
    }
    return name
}