import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

const Register = (props) => {
    const [user,setUser] = useState(
        {
            username: '',
            password: '',
            password2: '',
            errors: {}
        }
    )
    
    useEffect(() => {
        if (props.errors) {
            setUser({
                errors: props.errors
            });
        } 
    }, [props])

    const onChange = e => {
        let newInfo = {[e.target.id]:e.target.value};
        setUser({...user,...newInfo});
        // console.log(user);
    };

    const onSubmit = e => {
        e.preventDefault();
        const newUser = {
            username: user.username,
            password: user.password,
            password2: user.password2
        };
        props.registerUser(newUser, props.history); 
        if (user.errors) {
            setUser({...user,password:'',password2:''});
        }
        // console.log(user);
    };

    const errors = user.errors || {};

    return (
            <div className="container">
                <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Register</b> below
                    </h4>
                    <p className="grey-text text-darken-1">
                        Already have an account? <Link to="/login">Log in</Link>
                    </p>
                    </div>
                    <form noValidate onSubmit={onSubmit}>
                    <div className="input-field col s12">
                        <input
                        onChange={onChange}
                        value={user.username}
                        error={errors.username}
                        id="username"
                        type="text"
                        className={classnames("", {
                            invalid: errors.username
                        })}
                        />
                        <label htmlFor="username">Username</label>
                        <span className="red-text">{errors.username}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={onChange}
                        value={user.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password
                        })}
                        />
                        <label htmlFor="password">Password</label>
                        <span className="red-text">{errors.password}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={onChange}
                        value={user.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className={classnames("", {
                            invalid: errors.password2
                        })}
                        />
                        <label htmlFor="password2">Confirm Password</label>
                        <span className="red-text">{errors.password2}</span>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Sign up
                        </button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
    );
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect (
    mapStateToProps,
    { registerUser }
)(withRouter(Register));