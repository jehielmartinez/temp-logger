import React, { Component } from 'react';

class Form extends Component {
    fromRef = React.createRef();
    toRef = React.createRef();

    sendDates = e => {
        e.preventDefault();

        const dates = {
            from: this.fromRef.current.value,
            to: this.toRef.current.value
        };

        this.props.getDataFromDates(dates);
    }

    render() {
        return (
            <form className="form-inline justify-content-center" onSubmit={this.sendDates}>
    
                <div className="form-group m-2">
                    <label className="">From: </label>
                    <input ref={this.fromRef} type="date" className="form-control"/>
                </div>
                <div className="form-group m-2">
                    <label className="">To: </label>
                    <input ref={this.toRef} type="date" className="form-control"/>
                </div>
                <button type="submit" className="ml-5 btn btn-primary">Get Temp Logs</button>
                
            </form>
        );
    }
}

export default Form;