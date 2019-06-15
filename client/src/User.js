import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class User extends Component {
    state = {
        username: '',
        name: '',
        email: '',
        password: ''
    }

    componentDidMount(){
        const id = window.location.pathname
        const id2 = id.split("/")[1]
        const d = { username : id2}
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

    render() {
      
        return (
            <div className='dispaly-4 my-3 '>
                 <div className="container"style={{maxWidth: '25rem'}} >
                <h5> Username: {this.state.username}</h5>
                <h5> Name: {this.state.name}</h5>
                <h5> Password: {this.state.password}</h5>
                <h5> Email: {this.state.email}</h5>
                <br />
            
               <Link  className="btn btn-primary" to="/UserLogin">Logout</Link>
               
                </div>
            </div>
        )
    }
}

