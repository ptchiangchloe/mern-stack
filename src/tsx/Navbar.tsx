import React from 'react';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light" role="navigation">
                    <div className="navbar-brand-container">
                        <a className="navbar-brand mb-0 h1" href="#">My Closet App</a>
                    </div>
                </nav>
            </div>
        )
    }
}