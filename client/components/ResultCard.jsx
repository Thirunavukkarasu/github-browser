import React, { Component } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

export default class ResultCard extends Component {
    render(){
        return(
            <div className="row result-card">
                {this.props.users.map((user) =>
                    <UserCard key={user.id} user={user}/>
                )}
            </div>
        )
    }
}
