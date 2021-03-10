import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './style.css';

import { logoutUser } from "../../actions/authActions";

const Navbar = (props) => {
    const onLogoutClick = e => {
        e.preventDefault();
        props.logoutUser();
    }

    return (
        <div id="navbar">
            <div className="title">
                <h1>Pokemon Battle</h1>
            </div>
            <div className="nav-buttons">
                <Link to="/create">Create New Pokemon</Link>
                <Link to="/view">View All Pokemon</Link>
                <button onClick={onLogoutClick} 
                 className="btn waves-effect waves-light hoverable blue accent-3" style={{marginRight: '20px'}}>
                    Logout
                </button>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);