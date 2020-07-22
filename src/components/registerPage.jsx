import React from "react";
import {activate} from "../services/userService";
import queryString from 'query-string';

class RegisterPage extends React.Component{

    async componentDidMount() {
        const {key: parsed} = queryString.parse(this.props.location.search);
        await activate(parsed);
    }

    render() {
        return (
            <h2 className="text-center">
                Thank you for registering.
            </h2>
        );
    }
}

export default RegisterPage;