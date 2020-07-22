import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
    state = {
        data: {login: '', password: '', email: ''},
        errors: {}
    };

    schema = {
        login: Joi.string()
            .required()
            .label('Login'),
        password: Joi.string()
            .required()
            .min(4)
            .label('Password'),
        email: Joi.string()
            .required()
            .label('Email'),
    };

    doSubmit = async () => {
        try {
            const response = await userService.register(this.state.data);
            auth.loginWithJwt(response.headers["Authorization"]);
            window.location = "/info";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() {
        return (
            <div style={{height: "100vh"}}
                 className="d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="text-center">Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('login', 'Username', 'text')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('email', 'Email', 'email')}
                        {this.renderButton('Register')}
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterForm;