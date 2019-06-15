import React, {Component} from 'react';
import axios from 'axios';

export default class EditDetails extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            name: '',
            password: '',
            email: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        fetch('https://user-auth-task.herokuapp.com/api/getuser/'+this.props.match.params.id, {
            method: 'GET',
            body: null,
            headers: {
              'Content-Type': 'application/json',
          
            }
          })
          .then(
            (response) => {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
          
              // Examine the text in the response
              response.json().then((data) => {
                if (data.error) {
                  return this.setState({ error: data.message });
                }
              
               console.log(data)
                  return this.setState({
                    username: data.data.username,
                    name: data.data.name,
                    email: data.data.email,
                    password: data.data.password
                  })
            
              })
            }
            )
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // this.setState({
        //     username: this.state.username,
        //     name: this.state.name,
        //     email: this.state.email,
        //     password: this.state.password
        // });
        console.log(this.props.match.params.id)
        axios
<<<<<<< HEAD
        .post(
=======
        .put(
>>>>>>> b1a1be95c82636b804defeeca254e965f96d4f97
          `https://user-auth-task.herokuapp.com/api/user/${this.props.match.params.id}`, {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        },
          {
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(function(response) {
          console.log(response);
        });
       
        this.props.history.push('/users/Admin');
         window.location.reload(); 
    }

    render() {
        return (
            <div className="container "style={{maxWidth: '25rem'}} >
                <br />
                <h3>Update Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UserName: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                />
                    </div>
                    <div className="form-group">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />
                    </div>
                    <div className="form-group">
                    <label>Email address: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Save" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}