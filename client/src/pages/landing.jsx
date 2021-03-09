import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class Landing extends Component{
    render () {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>Signup for <span style={{ fontFamily: "monospace" }}><b>Pokemon battle</b></span></h4>
                    </div>
                    <p className="flow-text grey-text text-darken-1">
                        Go berserk drawing new pokemons to your heart's content 
                        and take part in the one-on-one battle royale.
                    </p>
                    <br />
                    <div className="col s6">
                    <Link
                        to="/register"
                        style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                        Register
                    </Link>
                    </div>
                    <div className="col s6">
                    <Link
                        to="/login"
                        style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px"
                        }}
                        className="btn btn-large btn-flat waves-effect white black-text"
                    >
                        Log In
                    </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;

