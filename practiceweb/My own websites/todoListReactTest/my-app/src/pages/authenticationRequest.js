//import { response } from "express";

export default (checkAuthenticated, callback_url) => {
    console.log('authenticationRequest package ran');
    // gets the url of where we need to send the request by using the current url
    let url = new URL(window.location);
    url.pathname = "/authenticate";

    //creating a search parameters object to add to the url
    let searchParams = new URLSearchParams();
    console.log(`this is the checkAuthenticated value ${checkAuthenticated}`);
    searchParams.set("checkAuthenticated", checkAuthenticated);
    searchParams.set("callback_url", callback_url);
    //adding the search params to the url
    url.search = searchParams.toString();
    //window.location = (url);
    let request = new XMLHttpRequest();


    request.onreadystatechange = () => {
        if(request.readyState == 4){
            let response = JSON.parse(request.responseText);
            console.log(response);
            
            if(!response.authorized){
                window.location = response.callback_url;
            }else{console.log('should continue to page it was supposed to');}
            //console.log(`the request wenth through and the response is ${request.responseText}`);
            /*if(request.responseText === false){
                console.log('should be redirected to /login');
                window.location =  '/login';
            }*/
        }
    }
    console.log(`this is the url ${url}`);
    request.open('GET', url, true);
    request.send();
    

}