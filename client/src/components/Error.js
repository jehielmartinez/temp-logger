import React from 'react';

const Error = () => {
    return (
        <div className="container">
        <div className="row">
          <div className="card-panel red darken-4 error">
              {this.props.error}
          </div>
        </div>
      </div>
    );
};

export default Error;