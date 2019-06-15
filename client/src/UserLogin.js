import React, { Component } from 'react';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      password: "",
      email: "",
      error: null,
      valerrors: null
    };
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
fetch('https://user-auth-task.herokuapp.com/api/login', {
  method: 'POST',
  body: JSON.stringify(loginDetails),
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
    
     
      console.log(data);
      return (window.location = `user/${data.data.username}`);
      // <Redirect to = `/user/${data.data.username}`/>
    })
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
<br />
{this.state.error && <p  className='my-3 text-center'>{this.state.error}</p>}


  
  </div>
</form>
    </div>
  )
}
}



export default Login