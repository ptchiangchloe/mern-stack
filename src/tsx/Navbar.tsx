import React from 'react';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="navbar-header">
                        <h1 className="navbar-brand navbar-nav navbar-center"><a>My Closet App</a></h1>
                    </div>
                </nav>
            </div>
        )
    }
}