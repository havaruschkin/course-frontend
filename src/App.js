import React, {Component} from 'react';
import './App.css';
import Compositions from "./components/composition/compositions";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/navBar";
import {Redirect, Route, Switch} from "react-router-dom";
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
import LanguageContext from "./context/languageContext";
import {en} from "./context/en";
import {ru} from "./context/ru";
import {getUser, updateUser} from "./services/userApiService";
import {ThemeProvider} from "styled-components";
import GlobalStyle from "./components/globalStyle";

class App extends Component {
    state = {language: en, theme: "light", currentUser: "", user: ""};

    async componentDidMount() {
        await this.initUser();
    }

    async initUser() {
        const user = auth.getCurrentUser();
        this.setState({user});
        if (user) {
            const {data: currentUser} = await getUser(user.sub);
            this.setState({currentUser, theme: currentUser.theme});
            if (currentUser.language === "en") {
                this.setState({language: en})
            } else {
                this.setState({language: ru})
            }
        }
    }

    handleLanguage = async language => {
        const {user} = this.state;
        if (user) {
            let currentUser = this.state.currentUser;
            currentUser.language = language;
            await updateUser(currentUser);
            this.setState({language: language === "en" ? en : ru});
        } else {
            this.setState({language: language === "en" ? en : ru});
        }
    };

    handleTheme = async theme => {
        const {user} = this.state;
        if (user) {
            let currentUser = this.state.currentUser;
            currentUser.theme = theme;
            await updateUser(currentUser);
            this.setState({theme})
        } else {
            this.setState({theme})
        }
    };

    render() {
        const {user} = this.state;
        let {language, theme} = this.state;

        return (
            <React.Fragment>
                <LanguageContext.Provider value={{language}}>
                    <ToastContainer/>
                    <ThemeProvider theme={{mode: theme}}>
                        <NavBar
                            user={user}
                            onLanguage={this.handleLanguage}
                            onTheme={this.handleTheme}
                        />
                        <GlobalStyle/>
                        <main className="container">
                            <Switch>
                                <Route path="/home" component={HomePage}/>
                                <Route path="/login" component={LoginForm}/>
                                <Route path="/register" component={RegisterForm}/>
                                <Route path="/compositions/:compositionId/chapters/:chapterId"
                                       component={ChapterForm}/>
                                <ProtectedRoute path="/compositions/:id" component={CompositionForm}/>
                                <Route
                                    path="/compositionRead/:id"
                                    render={props =>
                                        <CompositionRead {...props} user={user}/>}
                                />
                                <ProtectedRoute
                                    path="/compositions"
                                    render={props =>
                                        <Compositions {...props} user={user}/>}
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
                    </ThemeProvider>
                </LanguageContext.Provider>
            </React.Fragment>
        );
    }
}

export default App;
