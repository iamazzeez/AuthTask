import React, { Component } from 'react';
import FormValidator from './FormValidator';
import {Link} from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      { 
        field: 'username', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Username is required.' 
      },
      { 
        field: 'name', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Name is required.' 
      },
      { 
        field: 'email', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Email is required.' 
      },
      { 
        field: 'email',
        method: 'isEmail', 
        validWhen: true, 
        message: 'That is not a valid email.'
      },
      { 
        field: 'password', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password is required.'
      },
      { 
        field: 'password_confirmation', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Password confirmation is required.'
      },
      { 
        field: 'password_confirmation', 
        method: this.passwordMatch,   // notice that we are passing a custom function here
        validWhen: true, 
        message: 'Password and password confirmation do not match.'
      }
    ]);

    this.state = {
      email: '',
      username: '',
      name: '',
      password: '',
      password_confirmation: '',
      validation: this.validator.valid(),
    }

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  }
    
  handleFormSubmit = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
      console.log(this.state.email, this.state.name, this.state.username, this.state.password)

      const requestBody = {           
        username: this.state.username ,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
        }
       
fetch('https://user-auth-task.herokuapp.com/create', {
  method: 'POST',
  body: JSON.stringify(requestBody),
  headers: {
    'Content-Type': 'application/json',

  }
}).then(res => {
  if(res.status !== 200 && res.status !== 201){
    throw new Error('Failed!')
  } 
  res.json().then(resData => {
  alert('User created')
  console.log(resData);
})
})
.catch(err => {
  console.log(err)
}) 

    }
  }

  render() {
    let validation = this.submitted ?                         // if the form has been submitted at least once
                      this.validator.validate(this.state) :   // then check validity every time we render
                      this.state.validation                   // otherwise just use what's in state

    return (
      <div className="container"style={{maxWidth: '25rem'}} >
      <form className="demoForm">
        <h2  className='dispaly-4 my-3 text-center' >Sign up</h2>

        <div className={validation.username.isInvalid && 'has-error'}>
          <label htmlFor="username">UserName</label>
          <input type="text" className="form-control"
            name="username"
            placeholder="unique name"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.username.message}</span>
        </div>

        <div className={validation.name.isInvalid && 'has-error'}>
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control"
            name="name"
            placeholder="full name"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.name.message}</span>
        </div>
        <div className={validation.email.isInvalid && 'has-error'}>
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control"
            name="email"
            placeholder="john@doe.com"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.email.message}</span>
        </div>

        <div className={validation.password.isInvalid && 'has-error'}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control"
            name="password"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.password.message}</span>
        </div>

        <div className={validation.password_confirmation.isInvalid && 'has-error'}>
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input type="password" className="form-control"
            name="password_confirmation"
            onChange={this.handleInputChange}
          />
          <span className="help-block">{validation.password_confirmation.message}</span>
        </div>
        <br/>
        <div className='text-center'>
        <button onClick={this.handleFormSubmit} className="btn btn-primary">
          Sign up
        </button>
        </div>
      </form>
      <br/>
      <p >Existing user? <Link to='/UserLogin' >Login</Link></p>
      </div>
    )
  }
}
export default Signup;