import React, { Component } from 'react';
import axios from 'axios';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import LocalStorageManager from '../localStorageManager';

export default class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = {
         users : LocalStorageManager.getItem('users'),
         loading : false
      };
    }

    onClickAdd = (event) =>{
        const inputValue = this.searchInput.value;
        let usersList = this.state.users.slice();

        this.searchInput.value = "";
        if(LocalStorageManager.checkUserExists(inputValue)){
            alert("User already exists");
            return;
        }

        if(inputValue){
            this.setState({ loading: true });
            axios.get('https://api.github.com/users/'+inputValue)
              .then((response) => {
                LocalStorageManager.updateUsers(response.data);
                 usersList.push(response.data);
                 this.setState({users : usersList, loading: false});
              })
              .catch((error) => {
                  console.error(error);
                 alert(inputValue+" user not found");
                 this.setState({loading: false});
              });      
        }  
    }
  
    onClickResetAddedUsers = () => {
        LocalStorageManager.clearAllItems();
        this.setState({
            users : []
        })
    }

    render() {
      const { loading } = this.state;
      
      return (
            <div className="container-fluid">
                <div className="search-form">
                    <div className="input-group mb-3">
                        <input 
                            className="form-control mr-sm-2" 
                            type="search" 
                            placeholder="Search for Github user" 
                            ref={(input) => { this.searchInput = input; }}/>
                        <button className="btn btn-success" onClick={this.onClickAdd}>Add</button>
                        <button className="btn btn-danger" onClick={this.onClickResetAddedUsers}>Reset Added Users</button>
                    </div>
                </div>
                {loading ? <LoadingSpinner />:null}
                <div className="result-wrapper">
                    {
                        this.state.users.length > 0 ?(
                            <ResultCard users={this.state.users}/>
                        ):(
                            <div className="container info-msg">
                                <h4>No users added yet</h4>
                            </div>
                        )
                    }
                </div>
            </div>
      );
    }
}

