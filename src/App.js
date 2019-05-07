import React, { Component } from 'react';
import {BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LandingPage from './components/LandingPage/LandingPage';
import TutorDashboard from './components/TutorDashboard/TutorDashboard';
import Login from './components/LandingPage/Login/Login';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import studentAuth from './components/Auth/studentAuth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
      type: localStorage.getItem('type')
    }
    this.handleAuth = this.handleAuth.bind(this);
  }

  render() {
    if(!this.state.token) {
      return(
        <LandingPage handleLogin={this.handleAuth} />
      );
    }
    else {
      console.log(this.state.type)
      if(this.state.type === 'Student') {
        return(<StudentDashboard/>);
      }
      else if(this.state.type === 'Tutor') {
        return(<TutorDashboard/>);
      }
      else if(this.state.type === 'Admin') {
        return (<AdminDashboard/>);
      }
    }
    
  }

  handleAuth(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('type', data.type);

    this.setState({
      token: data.token,
      id: data.id,
      type: data.type
    },() => {
      console.log(this.state.token)
      console.log(this.state.id)
    });
    
  }
}

export default App;
