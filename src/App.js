import React, {Component} from 'react';
import './App.css';
import Compositions from "./components/composition/compositions";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/navBar";
import {Route, Switch, Redirect} from "react-router-dom";
import Users from "./components/users/users";
import CompositionRead from "./components/composition/compositionRead";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CompositionForm from "./components/composition/compositionForm";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/notFound";
import auth from "./services/authService";
import Logout from "./components/logout";
import ChapterForm from "./components/chapter/chapterForm";
import HomePage from "./components/homePage";
import InfoRage from "./components/InfoPage";
import RegisterPage from "./components/registerPage";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;

        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user={user}/>
                <main className="container">
                    <Switch>
                        <Route path="/home" component={HomePage}/>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/compositions/:compositionId/chapters/:chapterId" component={ChapterForm}/>
                        <ProtectedRoute path="/compositions/:id" component={CompositionForm}/>
                        <Route
                            path="/compositionRead/:id"
                            render={props =>
                                <CompositionRead {...props} user={this.state.user}/>}
                            />}
                        <ProtectedRoute
                            path="/compositions"
                            render={props =>
                                <Compositions {...props} user={this.state.user}/>}
                        />
                        <Route path="/info" component={InfoRage}/>
                        <Route path="/activate" component={RegisterPage}/>
                        <Route path="/logout" component={Logout}/>
                        <Route path="/not-found" component={NotFound}/>
                        <ProtectedRoute path="/users" component={Users}/>
                        <Redirect from="/" exact to="home"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
