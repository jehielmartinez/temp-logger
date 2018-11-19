import React from 'react';

const Header = (props) => {
    return (
        <div className = "navbar navbar-dark bg-dark justify-content-center">
            <div className="navbar-brand">
                {props.title}
            </div>
        </div>
    );
};

export default Header;