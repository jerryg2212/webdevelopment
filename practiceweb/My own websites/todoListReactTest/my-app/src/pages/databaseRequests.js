export default getData


function getData(url){
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
})
}

