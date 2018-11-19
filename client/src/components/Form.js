import React, { Component } from 'react';

class Form extends Component {

    render() {
        return (
            <form className="form-inline">
                
                <div className="form-group m-2">
                    <label className="">From: </label>
                    <input type="date" className="form-control"/>
                </div>
                <div className="form-group m-2">
                    <label className="">To: </label>
                    <input type="date" className="form-control"/>
                </div>
                <button type="submit" class="btn btn-primary">Get Temp</button>
                
            </form>
        );
    }
}

export default Form;