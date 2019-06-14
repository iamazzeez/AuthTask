import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class GetAllusers extends Component {
    state = {
    data: ''
    }

    componentDidMount(){
    fetch('http://localhost:5000/api/showusers', {
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
              return this.setState({ data: data })
          
        
          })
        }
        )
    }
    render() {
       
            return (
                <div className='dispaly-4 my-3 '>
                     {Object.values(this.state.data).map(user => (   
                    <div className="container"style={{maxWidth: '25rem'}} >
                    {/* <h5>Username: {user.username}</h5>
                    <h5>Name: {user.name}</h5>
                    <h5>Email: {user.email}</h5>
                    <h5>Password: {user.password}</h5>
                    <h5>Verified: {`${user.isValid}`}</h5> */}
                    <div class="card">
  <div class="card-body">
    <h4 class="card-title">{user.name}</h4>
    <h6 class="card-subtitle mb-2 text-muted">{user.username}</h6>
    <p class="card-text">Email: {user.email}</p>
    <p class="card-text">Password: {user.password}</p>
    <p class="card-text">Validated: {`${user.isValid}`}</p>
    <a href="#" class="card-link">Validate</a>
    <a href="#" class="card-link">Delete</a>
    <a href="#" class="card-link">Edit</a>
  </div>
</div>
                    <br />
                    </div>
                    ))}
                    <div className= 'container' style={{maxWidth: '25rem'}}>
                     <Link  className="btn btn-primary " to="/AdminLogin">Logout</Link>
                     </div>
                </div>
            )
            
         
       
    
}
}