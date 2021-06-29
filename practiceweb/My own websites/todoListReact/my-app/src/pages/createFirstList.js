import React from "react";
import "../styles/createFirstList.css";

class CreateFirstList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<div id="createFirstListBody">
            <a href="/delete" className="logOutLink">Log Out</a>
            <div id="wrapper">
                <h1>Please make a list</h1>
                <div className="container">
                    <form id="firstListForm" action="createList" method="POST">
                        <input type="firstListForm" name="listTitle" className="textInput" placeholder="Name of list"></input>                        <button type="submit" className="submitButton">Create List</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
    componentDidMount(){
        document.body.classList.add('bodyBackgroundColor')
    }
}

export default CreateFirstList