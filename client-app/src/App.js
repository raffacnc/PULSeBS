import './App.css';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import EventsList from './components/EventsList';
import TeacherPage from './components/TeacherPage';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import API from './api/API';


const localizer = momentLocalizer(moment);

class App extends React.Component {

    state = {
        events: [
            {
                start: moment().toDate(),
                end: moment().add(1, "hour").toDate(),
                title: "Scemo chi legge"
            }, {
                start: moment().add(5, "days").toDate(),
                end: moment().add(5, "days").add(1, "hour").toDate(),
                title: "Scemo ch"
            }
        ]
    };

    // Add a login method
  login = (email, password,type) => {
    API.userLogin(email, password,type).then(
      (user) => { 
        console.log(user);
      }
    ).catch(
      (errorObj) => {
        const err0 = errorObj.errors[0];
        this.setState({authErr: err0});
      }
    );
  }

    componentDidMount() {
      this.login("teacher@gmail.com","psw","st");
      console.log("component did mount");
    };

    render() {


        return (
            <Router>
                <div className="App">

                    <div className="container d-flex align-items-center flex-column">
                        <Switch>
                            <Route path="/login"
                                exact={true}>
                                <LoginForm login={this.login}/>
                            </Route>

                            <Route path="/student"
                                exact={true}>

                                <EventsList/>
                            </Route>

                            <Route path="/teacher"
                                exact={true}>
                                <TeacherPage/>


                                <div id="pagine">
                                    <Row>
                                        <Col sm={12}>
                                            <h3 className="mb-5">Personal Calendar</h3>
                                        </Col>
                                    </Row>
                                    <Calendar localizer={localizer}
                                        defaultDate={
                                            new Date()
                                        }
                                        defaultView="month"
                                        events={
                                            this.state.events
                                        }
                                        style={
                                            {height: "60vh"}
                                        }/>
                                </div>


                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}


export default App;
