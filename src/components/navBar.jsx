import React from "react";
import {NavLink, Link} from "react-router-dom";

const NavBar = ({user}) => {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-info">
            <Link className="navbar-brand" to="/home">
                <i className="fa fa-book" aria-hidden="true"/>
            </Link>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/home" exact>
                        Home
                    </NavLink>
                    {user && (
                        <NavLink className="nav-item nav-link" to="/compositions">
                            My compositions
                        </NavLink>
                    )}
                    {user && (user.auth.includes("ADMIN")) && (
                        <NavLink className="nav-item nav-link" to="/users">
                            Admin panel
                        </NavLink>
                    )}
                </div>
                <form className="form-inline my-2 my-lg-0">
                    {!user && (
                        <React.Fragment>
                            <NavLink className="nav-item nav-link" to="/login" style={{color: "white"}}>
                                Login
                            </NavLink>
                            <NavLink className="nav-item nav-link" to="/register" style={{color: "white"}}>
                                Register
                            </NavLink>
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <span style={{color: "white"}}>Hello: {user.sub}</span>
                            <NavLink className="nav-item nav-link" to="/logout" style={{color: "red"}}>
                                Logout
                            </NavLink>
                        </React.Fragment>
                    )}
                </form>
            </div>
        </nav>
    )
};

export default NavBar;