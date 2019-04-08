import React, { Component } from 'react';
import axios from 'axios';
import ClassesCard from '../ClassCard/ClassCard';

class ClassByAvailability extends Component {

    constructor(props) {
        super(props);
        this.state = {
            classes : []
        }
        this.queryAllClasses = this.queryAllClasses.bind(this);
    }

    componentDidMount(){
        this.queryAllClasses();
    }

    render(){
        return(
            <div>
                <div className='classes-section'>
                {this.state.classes.map(new_class => (
                    <ClassesCard    key={new_class._id}
                                    name={new_class.name}
                                    subject={new_class.subject}
                                    area={new_class.area}
                                    description={new_class.description}
                                    date={new_class.date}
                    />
                ))}
            </div>
            </div>
        );
    }

    queryAllClasses() {
        const token = this.props.token;
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token' : token 
        }
         axios.get('http://localhost:3001/students/classes', {headers})
            .then(data => {
                const arr = data.data;
                this.setState({
                    classes : arr
                })
            })
            .catch(reason =>{
                console.log(reason);
            });
    }

}
export default ClassByAvailability;