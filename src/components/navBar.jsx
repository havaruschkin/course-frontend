import React, {useContext} from "react";
import {Link, NavLink} from "react-router-dom";
import LanguageContext from "../context/languageContext";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = ({user, onLanguage, onTheme}) => {
    let {language} = useContext(LanguageContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Link className="navbar-brand" to="/home">
                <i className="fa fa-book fa-2x" aria-hidden="true"/>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink className="nav-item nav-link" to="/home">{language.navBar.home}</NavLink>
                    {user && (
                        <NavLink className="nav-item nav-link" to="/compositions">
                            {language.navBar.myCompositions}
                        </NavLink>
                    )}
                    {user && (user.auth.includes("ADMIN")) && (
                        <NavLink className="nav-item nav-link" to="/users">
                            {language.navBar.adminPanel}
                        </NavLink>
                    )}
                    <NavDropdown title={language.navBar.language} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#ru">
                            <span onClick={() => onLanguage("ru")}>{language.navBar.russian}</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#en">
                            <span onClick={() => onLanguage("en")}>{language.navBar.english}</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={language.navBar.themes} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#darck">
                            <span onClick={() => onTheme("dark")}>{language.navBar.dark}</span>
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#light">
                            <span onClick={() => onTheme("light")}>{language.navBar.light}</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <div className="form-inline">
                        {!user && (
                            <React.Fragment>
                                <NavLink className="nav-item nav-link m-2" to="/login">
                                    {language.navBar.login}
                                </NavLink>
                                <NavLink className="nav-item nav-link" to="/register">
                                    {language.navBar.register}
                                </NavLink>
                            </React.Fragment>
                        )}
                        {user && (
                            <React.Fragment>
                                <div style={{color: "white"}}
                                className="m-2">
                                    {language.navBar.hello}: {user.sub}
                                </div>
                                <NavLink className="nav-item nav-link" to="/logout" style={{color: "red"}}>
                                    {language.navBar.logout}
                                </NavLink>
                            </React.Fragment>
                        )}
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default NavBar;