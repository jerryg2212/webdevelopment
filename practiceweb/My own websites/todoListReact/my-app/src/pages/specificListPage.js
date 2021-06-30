import React from "react";
import "../styles/specificListPage.css";
import deleteIcon from "../icons/delete.svg";
import checkmarkIcon from "../icons/checkmark.svg";
import requestAuthentication from "./authenticationRequest.js";

// contexts for the delete and checkmark icons
let deleteCheckmarkIconsContext = React.createContext({deleteIcon : deleteIcon, checkmarkIcon: checkmarkIcon})
class SpecificListPage extends React.Component{
    constructor(props){
        super(props);
        //this.mediaQuery = window.matchMedia()
    }
    render(){
        return (
            <deleteCheckmarkIconsContext.Provider value={{deleteIcon : deleteIcon, checkmarkIcon: checkmarkIcon}}>
            <div id="specificListBody">
                <a href="/delete" className="logOutLink">Log Out</a>
                <SideNavListsContainer></SideNavListsContainer>
                <Wrapper></Wrapper>
            </div>
            </deleteCheckmarkIconsContext.Provider>
        )
    }
    componentDidMount(){
        document.body.classList.add('bodyBackgroundColor');
        requestAuthentication(true);
    }
}

    // side nav lists container
    class SideNavListsContainer extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return(
                <div id="sideNavListsContainer">
                    <SideNavCreateNewListForm></SideNavCreateNewListForm>                   
                    <ListsContainer></ListsContainer>
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
            }
            static contextType = deleteCheckmarkIconsContext;
            render(){
                return (
                    <div id="listsContainer">
                        <img src={this.context.deleteIcon} id="sideNavDeleteIcon" onClick={this.deleteIconClick.bind(this)} className="checkDeleteIcons"></img>
                        <h2>Lists</h2>
                        <ul id="sideNavUl"></ul>
                    </div>
                )
            }
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
        }
        render(){
            return (
                <div id="wrapper">
                    <h1 className="pascalCase whiteHeader">List Title</h1>
                    <ListContainer></ListContainer>
                </div>
                )
        }
    }
        // contianer that holds the current list
        class ListContainer extends React.Component{
            constructor(props){
                super(props);
            }
            static contextType = deleteCheckmarkIconsContext;
            render(){
                return (
                    <div id="listContainer" className="container">
                        <img src={this.context.deleteIcon} id="deleteIcon" onClick={this.deleteIconClick.bind(this)} className="checkDeleteIcons"></img>
                        <form action="/list/listTitle" method="POST" id="addNewItemForm">
                            <button type="submit" className="submitButton" id="newItemButton">Post Item</button>
                            <div id="inputWrapperCreateItem" className="inputWrapper">
                                <input type="text" name="newItem" id="textInput" className="textInput"></input>
                            </div>
                            <ul id="tasksList"></ul>
                        </form>
                    </div>
                )
            }
            deleteIconClick(ev) {
                console.log(this.context.deleteIcon);
                let img = document.getElementById('deleteIcon');
                console.log(img.src);
                img.src = (/[.]*delete[.]*/.test(img.src)) ? this.context.checkmarkIcon : this.context.deleteIcon;
                
            }
        }

        export default SpecificListPage