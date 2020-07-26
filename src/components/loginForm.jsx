import React from "react";
import Joi from 'joi-browser';
import Form from "./common/form";
import auth from "../services/authService";
import {Redirect} from "react-router-dom";
import LanguageContext from "../context/languageContext";

class LoginForm extends Form {
    static contextType = LanguageContext;

    state = {
        data: {username: '', password: ''},
        errors: {}
    };

    schema = {
        username: Joi.string()
            .required()
            .label('Username'),
        password: Joi.string()
            .required()
            .label('Password')
    };

    doSubmit = async () => {
        try {
            const {data} = this.state;
            await auth.login(data.username, data.password);

            const {state} = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() {
        if (auth.getCurrentUser()) return <Redirect to="/"/>;

        return (
            <LanguageContext.Consumer>
                {languageContext => (
                    <div style={{height: "100vh"}}
                         className="d-flex justify-content-center align-items-center">
                        <div>
                            <h1 className="text-center">{languageContext.language.loginForm.login}</h1>
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput(
                                    'username',
                                    languageContext.language.loginForm.username,
                                    'text')}
                                {this.renderInput(
                                    'password',
                                    languageContext.language.loginForm.password,
                                    'password')}
                                {this.renderButton(languageContext.language.loginForm.login)}
                            </form>
                        </div>
                    </div>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default LoginForm;