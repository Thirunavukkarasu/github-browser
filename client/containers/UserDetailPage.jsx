import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import LocalStorageManager from '../localStorageManager';

class UserDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
           loading : false,
           user :  {},
           repos : [],
           followers : []
        };
    }

    componentDidMount(){
        let {match} = this.props;
        let userId = match.params.id;

        let currentUser = LocalStorageManager.getUserByLoginId(userId);
        let repos = LocalStorageManager.getReposByLoginId(userId);
        let followers = LocalStorageManager.getFollowersByLoginId(userId);

        this.setState({
            user  : currentUser,
            repos,
            followers
        });

        repos.length <= 0 && this.getRepositories(userId);
        followers.length <= 0 &&this.getFollowers(userId);
    }

    
    getRepositories(userId){
        if(userId){
            this.setState({ loading: true });
            axios.get('https://api.github.com/users/'+userId+'/repos',{
                params :{
                    access_token : "7c5e47e46d1acc0549c0fdd807e7d03d8db6667f"
                }
              })
              .then((response) => {
                  LocalStorageManager.updateRepos(userId, response.data);
                 this.setState({repos : response.data, loading: false});
              })
              .catch((error) => {
                  console.error(error);
                 this.setState({loading: false});
              });   
        }  
    }

    getFollowers(userId){
        if(userId){
            this.setState({ loading: true });
            axios.get('https://api.github.com/users/'+userId+'/followers',{
                params :{
                    access_token : "7c5e47e46d1acc0549c0fdd807e7d03d8db6667f"
                }
              })
              .then((response) => {
                LocalStorageManager.updateFollowers(userId, response.data);
                 this.setState({followers : response.data, loading: false});
              })
              .catch((error) => {
                  console.error(error);
                 this.setState({loading: false});
              });      
        }  
    }    

    render(){
        const { loading } = this.state;
        return(
            <div className="container user-detail-wrapper">
                <div className="row mx-auto top-card">
                    <img src={this.state.user.avatar_url}/>
                    <h4>{this.state.user.name}</h4>
                </div>
                <div className="row">
                    <div className="col-md-5 ml-auto card">
                        <h4>Repositories</h4>
                        <ol>{
                            this.state.repos.map((repo, index) =>{
                                return (
                                    <li key={index}>
                                        <a href={repo.svn_url} target="_blank">
                                            {repo.name}
                                        </a>
                                    </li>
                                )
                            })
                        }</ol>
                    </div>
                    <div className="col-md-5 mr-auto card">
                        <h4>Followers</h4>
                        <ol>{
                            this.state.followers.map((follower, index) =>{
                                return (
                                    <li key={index}>
                                        <a href={follower.html_url} target="_blank">
                                            {follower.login}
                                        </a>
                                    </li>
                                )
                            })
                        }</ol>                    
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserDetailPage)