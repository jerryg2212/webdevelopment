import React from 'react';
import '../styles/workbenchOptionsComponent.css';
// receives an array as a property that containers the operations
// operation keys = {id, active, textContent, clickEventHandler
// id = button id, active = true/false depending on if the operation that the button represents is active,
// textContent = textContent, clickEventHandler = function to run when button is clicked
class WorkbenchOptionsComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="operationsContainer">
                {this.props.operations.map((elm, ind, arr) =>(
                    <button className={`playSongContainerButton ${(elm.active) ? 'active' : ''}`} id={elm.id} key={elm.title} onClick={elm.clickEventHandler}>{elm.title}</button>
                ))}
            </div>
        )
    }
}

export default WorkbenchOptionsComponent