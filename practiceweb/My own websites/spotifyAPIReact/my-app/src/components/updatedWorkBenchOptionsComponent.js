import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/updatedWorkBenchOptionsComponent.css';

// Notes
    // parent element should have a value in the state thats value is the active operation component. And the updateParentState function passed to this component should update that value
// class that returns a list of buttons that display the options for the current operation on the workbench
// properties
    // updateParentState = a function that is called to update the parents state in order to render the newly active option
    // activeOptionComponent = the active option
    // options = an array of objects describing the options
        // the objects in the array of options have the following properties 
        //{id = id of button, textContent = buttons text, active = boolean whether or not the option is active}
class UpdatedWorkbenchOptionsComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="optionsContainer">
            {this.props.options.map((elm, ind, arr) => (
                <button key={elm.optionComponent} optioncomponent={elm.optionComponent} className={(elm.optionComponent === this.props.activeOptionComponent) ? "primaryButtonStyle active" : "primaryButtonStyle"} onClick={this.updateActiveComponent.bind(this)}>{elm.textContent}</button>
            ))}
            </div>
        )
    }
    // function that changes the active option
    updateActiveComponent(ev){
        console.log(ev.target.attributes.getNamedItem('optionComponent').value);
        this.props.updateParentState(ev.target.attributes.getNamedItem('optionComponent').value);
    }
}

    // class that represents the individual option in the updatedworkbenchoptionscomponent
    // properties
        // id = id of element
        // textContent = textContent of element
        // active = boolean whether or not the option is active
    class WorkbenchOptionComponent extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <button id={this.props.id} className={(this.props.active) ? 'primaryButtonStyle active' : 'primaryButtonStyle'}>{this.props.textContent}</button>
            )
        }
    }

export default UpdatedWorkbenchOptionsComponent