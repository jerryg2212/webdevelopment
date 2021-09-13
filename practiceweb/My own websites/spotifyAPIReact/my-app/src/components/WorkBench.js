import React from 'react';

class WorkBench extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="workBenchContainer">
                <div id="workBenchNavBarContainer">
                    <WorkBenchTaskSelect />
                </div>
                <WorkBenchActionContainer />
            </div>
        )
    }
}
        // returns a label that holds a select element that has options of tasks the user can do
        class WorkBenchTaskSelect extends React.Component{
            constructor(props){
                super(props);
                this.tasks = [{name: '     ', action : ''}, {name : 'Display All Playlists', action : ''}];
            }
            render(){
                let options = this.makeOptions();
                return (
                    <label>What would you like to do?
                        <select>{options}</select>
                    </label>
                    )
                }
            makeOptions(){
                return this.tasks.map((elm, index, arr) => {
                    return <option key={elm.name} value={elm.name}>{elm.name}</option>
                })
            }
        }
    class WorkBenchActionContainer extends React.Component{
        constructor(props){
            super(props);
        }
        render(){
            return (
                <div id="workBenchActionContainer"></div>
            )
        }
    }

export default WorkBench