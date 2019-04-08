import React, { Component } from 'react';
import axios from 'axios';
import NotificationCard from './NotificationCard/NotificationCard';
import { Redirect } from 'react-router-dom'

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            raw_notifications : [],
            classes_notifications : []
        };
        this.fetchPendingBookings = this.fetchPendingBookings.bind(this);
        this.fetchClassesById = this.fetchClassesById.bind(this);
        
    }

    componentWillReceiveProps() {
        if(!this.props.token) {
            return <Redirect to="/dashboard/tutor"/>
        }
    }
    
    componentDidMount() {
        this.fetchPendingBookings();
    }

    render() {

        if(this.state.classes_notifications.length > 0) {
            let idToClassMap = new Map();
            this.state.classes_notifications.forEach(element => {
                idToClassMap.set(element._id, element);
            });
            return(
                <div id="notifications">
                    {this.state.raw_notifications.map(notification => {
                        const requested_class_id = notification.booked_class;
                        const requested_class = idToClassMap.get(requested_class_id);
                        return (<NotificationCard   key={notification._id}
                                                    class_name={requested_class.name}
                                                    class_price={requested_class.cost}
                                                    class_schedule={requested_class.date}
                                                    id = {notification._id}
                                                    token = {this.props.token}
                                                    onChange = {this.fetchPendingBookings}
                                            />);
    
                    })}
                </div>
            );
        } else {
            return(
                <div>
                    Nothing to show!
                </div>
            )
        }
    }

    fetchPendingBookings() {
        const token = this.props.token;
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token' : token 
        }
        axios.get('http://localhost:3001/tutors/bookings', {headers})
            .then(val => {
                const arr = val.data;
                this.setState({raw_notifications : arr}, () => {
                    this.fetchClassesById();
                });
            })
            .catch(reason => console.log(reason));
    }

    fetchClassesById() {
        const token = this.props.token;
        let notifications_ids = []; 
        this.state.raw_notifications.forEach(element => {
            if(!notifications_ids.includes(element.booked_class)) {
                notifications_ids.push(element.booked_class);
            }
        });
     
        axios.get('http://localhost:3001/tutors/class/',{
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token' : token 
            },
            params: {
                ids : notifications_ids
            }
        })
            .then(value => {
                const data_arr = value.data;
                this.setState({
                    classes_notifications : data_arr,
                })
            })
            .catch(error => console.log(error));
    }

    
}

export default Notifications;