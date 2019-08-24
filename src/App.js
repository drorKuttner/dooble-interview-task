import React from 'react';
import './App.scss';
import {renderUser} from './user/user-component';
import {getUsersByPage} from './api/api.service';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {CircularIndeterminate} from './spinner';

class App extends React.Component {

    state = {
        users: [], // all loaded users
        filteredUsers: [], // filtered by user search
        currentPage: 1,
        searchField: "",
        isLoading: false // for spinner
    };

    // on load - ask for the first 9 users
    componentDidMount() {
        getUsersByPage(this.state.currentPage).then(
          res => {
              this.setState({
                 users: this.state.users.concat(res.data.results),
                 filteredUsers: this.state.users.concat(res.data.results)
              });
          }
        );
    }

    // filter list by user text on the top
    handleUserInput(event) {

        this.setState({searchField: event.target.value});
        this.setState({filteredUsers: this.state.users.filter(user => {
                return user.name.first.includes(event.target.value) ||
                    user.name.last.includes(event.target.value);
        })});
    }


    // when user asks to load more by button - load the next page
    loadMore() {
        this.setState({isLoading: true});
            getUsersByPage(this.state.currentPage + 1).then(
                res => {
                    this.setState({
                        isLoading: false,
                        users: this.state.users.concat(res.data.results),
                        filteredUsers: this.state.users.concat(res.data.results).filter(user => {
                            return user.name.first.includes(this.state.searchField) ||
                                user.name.last.includes(this.state.searchField);
                        }),
                        currentPage: this.state.currentPage + 1,
                    });
                }
            );
    }


    render() {
        return (
          <div className="root">
              {!this.state.users.length ?  CircularIndeterminate() : <div>
                  <div className="search-bar-container">
                      <form noValidate autoComplete="off" className="search-bar">
                          <TextField
                              id="name"
                              label="User Name"
                              margin="normal"
                              onChange={(event) => {
                                  this.handleUserInput(event);
                                }
                              }
                              value={this.state.searchField}
                          />
                      </form>
                  </div>
                  <div className="users-and-load-wrapper">
                      <div className="users-container">
                          {this.state.filteredUsers.map((user, idx) => renderUser(user, idx))}
                      </div>
                      {this.state.isLoading ? CircularIndeterminate() : // prevent double loading call with spinner
                          <Button variant="contained" color="secondary" className="load-button"
                                 disabled={this.state.isLoading} onClick={this.loadMore.bind(this)}>
                              Load More
                          </Button>
                      }
                  </div>
              </div>}
          </div>
        );
    }
}

export default App;


