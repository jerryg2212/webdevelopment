import React from "react";
import "../styles/specificListPage.css";
import deleteIcon from "../icons/delete.svg";
import checkmarkIcon from "../icons/checkmark.svg";
import requestAuthentication from "./authenticationRequest.js";
import {getData, postData} from './databaseRequests.js';
import { deleteButtonClickEvent } from "./universalFunctions";

const specificListContext = React.createContext({
    currentListTitle: '',
    currentListItems: [],
    listOfLists: []
});

// contexts for the delete and checkmark icons
let deleteCheckmarkIconsContext = React.createContext({deleteIcon : deleteIcon, checkmarkIcon: checkmarkIcon})
class SpecificListPage extends React.Component{
    constructor(props){
        super(props);
        //this.mediaQuery = window.matchMedia()
        this.state = {
            currentListTitle: '',
            currentListItems: [],
            listOfLists: []
        }
    }
    render(){
        return (
            <specificListContext.Provider value={this.state}>
            <deleteCheckmarkIconsContext.Provider value={{deleteIcon : deleteIcon, checkmarkIcon: checkmarkIcon}}>
            <div id="specificListBody">
                <a href="#" className="logOutLink" onClick={deleteButtonClickEvent}>Log Out</a>
                <SideNavListsContainer></SideNavListsContainer>
                <Wrapper listTitle={this.state.currentListTitle} listItems={this.state.currentListItems}></Wrapper>
            </div>
            </deleteCheckmarkIconsContext.Provider>
            </specificListContext.Provider>
        )
    }
    async componentDidMount(){
        document.body.classList.add('bodyBackgroundColor');
        await requestAuthentication(true, '/login');
       // requestAuthentication(true);
      let url = new URL(window.location);
       url.pathname =  `api${window.location.pathname}`;

      // let request = new XMLHttpRequest();
     /*  let response = await getData(url);
      /*  request.onreadystatechange = () => {
            if(request.readyState == 4){
                response = JSON.parse(request.responseText);
                console.log(` this state set and the response is ${Object.keys(response)}`);
                console.log(`${response.listTitle}  ${response.items}  ${response.lists}`)

            }
        }*/  /*
        this.setState({
            currentListTitle: response.listTitle,
            currentListItems: response.items,
            listOfLists: response.lists
        })*/
        console.log(`specific list page request should of sent this is the url ${url}`);
      /* request.open("GET", url, true);
       request.send();*/
    }

}

    // side nav lists container
    class SideNavListsContainer extends React.Component{
        constructor(props){
            console.log("side nav lists contianer rendered again");
            super(props);
        }
        render(){
            return(
                <div id="sideNavListsContainer">
                    <SideNavCreateNewListForm></SideNavCreateNewListForm>     
                    <specificListContext.Consumer>
                        {value =>  (<ListsContainer listOfLists={value.listOfLists}></ListsContainer>)}
                        </specificListContext.Consumer>              
                </div>
            )
        }
    }

        //create new list container
        class SideNavCreateNewListForm extends React.Component{
            constructor(props){
                super(props);
            }
            render(){
                return (
                    <div id="sideNavFormWrapper">
                        <h2>Create New List</h2>
                        <form id="createNewListForm" action="/createList" method="POSt">
                            <button id="newListButton" type="submit" className="submitButton">New List</button>
                            <div id="inputWrapperCreateForm" className="inputWrapper">
                                <input type="text" className="textInput" id="createListTextInput" name="listTitle"></input>
                            </div>
                        </form>
                    </div>
                )
            }
        }
    
        //container that holds the list of all the lists
        class ListsContainer extends React.Component{
            constructor(props){
                super(props);
                this.state = {listOfLists: []}
            }
            static contextType = deleteCheckmarkIconsContext;
            
            render(){
                return (
                    <div id="listsContainer">
                        <img src={this.context.deleteIcon} id="sideNavDeleteIcon" onClick={this.deleteIconClick.bind(this)} className="checkDeleteIcons"></img>
                        <h2>Lists</h2>
                        <ul id="sideNavUl">{this.populateListOfLists()}</ul>
                    </div>
                )
            }
            async componentDidMount(){
                let url = new URL(window.location);
                url.pathname = '/api/lists';
                let lists = await getData(url);
                this.setState({listOfLists: lists.lists});
                
            }
            populateListOfLists(){
                let listOfLists = document.getElementById('sideNavUl');
                for(let list of this.state.listOfLists){
                    let li = document.createElement('li');
                    li.textContent = list;
                    listOfLists.appendChild(li);
                }
            }
           /* componentDidMount(){
                this.populateListOfLists();
            }*/
            deleteIconClick(ev) {
                console.log(this.context.deleteIcon);
                let img = document.getElementById('sideNavDeleteIcon');
                console.log(img.src);
                img.src = (/[.]*delete[.]*/.test(img.src)) ? this.context.checkmarkIcon : this.context.deleteIcon;
                
            }
        }
    // container that holds the header and list container
    class Wrapper extends React.Component{
        constructor(props){
            super(props);
            let url = new URL(window.location);
            let search = new URLSearchParams(url.search);
            this.state = {
                listTitle: search.get('list')
            }
        }
        render(){
            return (
                <div id="wrapper">
                    <h1 className="pascalCase whiteHeader">{this.state.listTitle}</h1>
                    <ListContainer listItems={this.props.listItems} listTitle={this.state.listTitle}></ListContainer>
                </div>
                )
        }
    }
        // contianer that holds the current list
        class ListContainer extends React.Component{
            constructor(props){
                super(props);
                this.state = {listItems : []}
            }
            static contextType = deleteCheckmarkIconsContext;
            render(){
                return (
                    <div id="listContainer" className="container">
                        <img src={this.context.deleteIcon} id="deleteIcon" onClick={this.deleteIconClick.bind(this)} className="checkDeleteIcons"></img>
                        <form action={`/list/${this.props.listTitle}`} method="POST" id="addNewItemForm" onSubmit={this.newItemFormSubmitEvent}>
                            <button type="submit" className="submitButton" id="newItemButton">Post Item</button>
                            <div id="inputWrapperCreateItem" className="inputWrapper">
                                <input type="text" name="newItem" id="textInput" className="textInput"></input>
                            </div>
                            <ul id="tasksList">{this.populateListOfItems()}</ul>
                        </form>
                    </div>
                )
            }
            async componentDidMount(){
                let url = new URL(window.location);
                url.pathname = `/api/${this.props.listTitle}/items`;
                let itemsResponse = await getData(url);
                this.setState({listItems : itemsResponse.items})
            }
            populateListOfItems(){
                let ul = document.getElementById('tasksList');
                for(let item of this.state.listItems){
                    let li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                }
            }
            deleteIconClick(ev) {
                console.log(this.context.deleteIcon);
                let img = document.getElementById('deleteIcon');
                console.log(img.src);
                img.src = (/[.]*delete[.]*/.test(img.src)) ? this.context.checkmarkIcon : this.context.deleteIcon;   
            }
            newItemFormSubmitEvent(ev){
                console.log(ev);
            }
        }

        export default SpecificListPage