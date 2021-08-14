import {getData, postData} from './databaseRequests.js';

// delete button click event that sends a request to log the user out
export async function deleteButtonClickEvent(ev){
    console.log('deleteButtonClickEventRan');
    let result = await getData('/delete');
    window.location = '/login';
}