import React from 'react';

const Header = (props) => {
    return (
        <nav className = "navbar navbar-dark bg-dark justify-content-center">
            <span className="navbar-brand">
                {props.title}
            </span>
        </nav>
    );
};

export default Header;