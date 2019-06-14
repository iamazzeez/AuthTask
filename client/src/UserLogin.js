import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();


  }



  handleLogin = (e ) => {
  e.preventDefault()
  const email = this.emailEl.current.value;
  const password = this.passwordEl.current.value;

  if(email.trim().length === 0 || password.trim().length === 0){
      return;
  }


  console.log(email, password, this.props.login)
  const loginDetails = {
    password: password,
    email: email,
  }

 
// fetch('http://localhost:5000/get', {
//   method: 'GET',
//   body: JSON.stringify(requestBody),
//   headers: {
//     'Content-Type': 'application/json',

//   }
// }).then(res => {
//   if(res.status !== 200 && res.status !== 201){
//     throw new Error('Failed!')
//   }
//   res.json();
    
// }).then(resData => {
//   console.log(resData);
// })

// .catch(err => {
//   console.log(err)
// }) 
fetch('http://localhost:5000/api/login', {
  method: 'POST',
  body: JSON.stringify(loginDetails),
  headers: {
    'Content-Type': 'application/json',

  }
})
.then(
  function(response) {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }

    // Examine the text in the response
    response.json().then(function(data) {
      alert(data.message);
    });
  }
  )
}


render() {
  return (

    <div className="container"style={{maxWidth: '25rem'}} >
      <form onSubmit={this.handleLogin}>
      <h1 className='dispaly-4 my-3 text-center' > User Login</h1>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" ref={this.emailEl} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" ref={this.passwordEl} className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
  </div>
  <div className='text-center'>
  
<button type='submit'class="btn btn-primary">Login</button>


  
  </div>
</form>
    </div>
  )
}
}



export default Login