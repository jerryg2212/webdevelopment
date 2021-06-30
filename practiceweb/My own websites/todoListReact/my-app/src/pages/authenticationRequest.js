
export default (checkAuthenticated) => {
   /* fetch(`/authenticate?checkAuthenticated=${checkAuthenticated}`, {
        headers : {
            "accepts" : "application/json"
        }
    })
    .then((res) => {console.log(res)})
    .catch((e) => {console.log(e)});*/
    console.log('authenticationRequest package ran');
    // gets the url of where we need to send the request by using the current url
    let url = new URL(window.location);
    url.pathname = "/authenticate";

    //creating a search parameters object to add to the url
    let searchParams = new URLSearchParams();
    searchParams.set("checkAuthenticated", checkAuthenticated);
    //adding the search params to the url
    url.search = searchParams.toString();
    
    let request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if(request.readyState == 4){
            console.log(`the request wenth through and the response is ${request.responseText}`);
        }
    }
    console.log(`this is the url ${url}`);
    request.open('GET', url, true);
    request.send();
    

}