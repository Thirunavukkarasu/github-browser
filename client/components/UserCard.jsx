import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserCard extends Component {

    changeRoute = () => {
        this.props.history.push('/userdetail/'+this.props.user.id);
    }

    render(){
        let fields = ["company","location", "email", "followers", "following", "created_at", "public_gists", "public_repos"];
        let attributes = [];
        Object.keys(this.props.user).map((key, index)=>{
            if(fields.indexOf(key) >=0){
                attributes.push({
                    id  : index,
                    key : key.toUpperCase(), 
                    value : this.props.user[key]
                });
            }
        });

        return(
            <div className="card user-card col-md-3">
                <img className="card-img-top" src={this.props.user.avatar_url} alt="User Avatar"/>
                <div className="card-body">
                    <h5 className="card-title">
                        <a target="_blank" href={this.props.user.avatar_url}>
                            {this.props.user.name?this.props.user.name:this.props.user.login}
                        </a>
                    </h5>
                    <hr className="divider"/>
                    <div className="card-text">
                        {attributes.map((attribute)=>(
                                <p key={attribute.id}>
                                    <b>{attribute.key}{": "}</b>
                                    <span>{attribute.value}</span>
                                </p>
                            ))
                        } 
                    </div>
                    <Link to={`/userdetail/${this.props.user.login}`} className="btn btn-primary">Browse User Details</Link>
                </div>
            </div>            
        )
    }
}


export default withRouter(UserCard)