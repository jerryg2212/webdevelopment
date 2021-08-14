


exports.getData = function(url){
return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if(request.readyState == 4){
            if(request.status > 199 && request.status < 300){
                console.log(JSON.parse(request.responseText))
                resolve(JSON.parse(request.responseText));
            }else {
                reject("there was an error getting the data")
            }
        }
    }

    request.open("GET", url, true);
    request.send();
});
}
exports.postData = async function(url, data){
    let response =  await makeRequest(url,"POST", data);
    console.log(`extra ${response.error}`);
    return response;
}
function makeRequest(url, method, data){
console.log(data);
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = () => {
            if(request.readyState == 4){
                if(request.status > 199 && request.status < 300){
                    //console.log(JSON.parse(request.responseText))
                    let result = JSON.parse(request.responseText);
                    resolve(result);
                }else {
                    reject("there was an error getting the data")
                }
            }
        }
        data = JSON.stringify(data);
        console.log(data);
        request.send(data);
    })
}

