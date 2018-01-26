import React from 'react';
import {withAlert} from 'react-alert'

class App extends React.Component{
    handleSubmit(e){
        e.preventDefault();
        var temp = e.target.elements.stageNames.value.split(',');
        var stageNames = [];
        temp.forEach(busStop => {
            stageNames.push(busStop.trim());
        });
        var stageWiseFare = [5,6,7,8,9,10,11,12,13,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23];
        var data = {
            busNo: e.target.elements.busNo.value,
            routeNo: e.target.elements.routeNo.value,
            origin: e.target.elements.origin.value,
            destination: e.target.elements.destination.value,
            noOfStages: e.target.elements.noOfStages.value,
            journeyTime: e.target.elements.journeyTime.value,
            status: "inactive",
            isReverse: false,
            stageNames,
            stageWiseFare
        }
        fetch('https://mtcticketing.herokuapp.com/addbus',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify({
                data
            })
        }).then(res=>res.json()).then(({status})=>{
            if(status){
                this.props.alert.success("Bus Added Successfully");
                document.getElementById('addBusForm').reset();
            }else{
                this.props.alert.error("Error");
            }
        });
    }
    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Add Bus</h3>
                        <div className="form-container">
                            <form id="addBusForm" onSubmit={this.handleSubmit.bind(this)} className="addbusform">
                                <input required className="form-control" name="busNo" placeholder="Enter Bus Number"/>
                                <input required className="form-control" name="routeNo" placeholder="Enter Route Number" />
                                <input required className="form-control" name="origin" placeholder="Enter Origin" />
                                <input required className="form-control" name="destination" placeholder="Enter Destination" />
                                <input required className="form-control" name="noOfStages" placeholder="Enter No. Of Stages" />
                                <input required className="form-control" name="journeyTime" placeholder="Enter Journey Time" />
                                <textarea rows="6" required className="form-control" name="stageNames" placeholder="Enter Stage Name One by One followed by comma" />
                                <button className="btn btn-outline-success add-btn" type="submit">Add Bus</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAlert(App);