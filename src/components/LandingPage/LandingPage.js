import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './Login/Login';
import LandingNavBar from './LandingNavBar/LandingNavBar';
import Content from './Content/Content';
import Search from './Search/Search';

import StudentDashboard from '../StudentDashboard/StudentDashboard';
import TutorDashboard from '../TutorDashboard/TutorDashboard';
import StudentSignup from './Signup/Student/StudentSignup';
import TutorSignup from './Signup/Tutor/TutorSignup';

class LandingPage extends Component {

    constructor() {
        super();
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.state = {
            isAuthenticated: false,
            userToken: '',
            userType: ''
        }

    }

    render() {
        if(!this.state.isAuthenticated) {
            return(
                <div>
                    <BrowserRouter>
                        <div>
                            <LandingNavBar/>
                            <Switch>
                                <Route 
                                    path="/login" 
                                    render = {
                                        (props) => <Login {...props} onUserLogin={this.handleLoginChange} />
                                    }
                                    exact/>
                                <Route path="/" component={Content} exact />
                                <Route path="/signup" component={StudentSignup} exact/>
                                <Route path="/search" component={Search} exact/>
                                <Route path="/tutors" component={TutorSignup} exact/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </div>
            );
        }
        else {
            if(this.state.userType === 'Student') {
                return(
                    <div>
                        <BrowserRouter>
                            <div>
                                <Switch>
                                    <Route 
                                            path="/student/dashboard" 
                                            render = {
                                                (props) => <StudentDashboard {...props} token={this.state.userToken} />
                                            }
                                            exact
                                    />
                                </Switch>
                            </div>
                        </BrowserRouter>
                        ola
                    </div>
                );
            }
            else if(this.state.userType === 'Tutor') {
                console.log('rip');
                return(
                    <div>
                        <BrowserRouter>
                            <div>
                                <Switch>
                                    <Route 
                                            path="/tutor/dashboard" 
                                            render = {
                                                (props) => <TutorDashboard {...props} token={this.state.userToken} />
                                            }
                                            exact
                                    />
                                </Switch>
                            </div>
                        </BrowserRouter>
                    </div>
                );
            }
        }
    }

    handleLoginChange(data) {
        this.setState({
            isAuthenticated: data.authenticated,
            userToken: data.token,
            userType: data.type
        });
    }
}

export default LandingPage;