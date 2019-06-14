import React, { Component } from 'react'

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
                    <h5>Username: {user.username}</h5>
                    <h5>Name: {user.name}</h5>
                    <h5>Email: {user.email}</h5>
                    <h5>Password: {user.password}</h5>
                    <h5>Verified: {`${user.isValid}`}</h5>
                    <br />
                    </div>
                    ))}
                </div>
            )
            
         
       
    
}
}