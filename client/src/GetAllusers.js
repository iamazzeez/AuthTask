import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { deleteItem, updateItem } from "./AdminFunctions";
export default class GetAllusers extends Component {
    state = {
    data: ''
    }

    componentDidMount(){
  this.getAll()
    
    }


    getAll = () => {
        fetch('https://user-auth-task.herokuapp.com/api/showusers', {
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
    onUpdate = (val, e) => {
        e.preventDefault();
        updateItem(val).then(() => {
          this.getAll();
        });
      };


    onDelete = (val, e) => {
        e.preventDefault();
        console.log(val)
        deleteItem(val);
    
        var data = [...this.state.data];
        data.filter((item, index) => {
           
          if (item.username === val) {
            data.splice(index, 1);
          }
        });
        this.setState({ data: [...data] });
      };
    
    render() {
       
            return (
<div className='row  m-1 '>
        {Object.values(this.state.data).map(user => (   
    
        
        <div className="col-md-4.6 m-1">
    <div class="card">
<div class="card-body">
<h4 class="card-title">{user.name}</h4>
<p class="card-text">Username: {user.username}</p>
<p class="card-text">Email: {user.email}</p>
<p class="card-text">Password: {user.password}</p>
<p class="card-text">Validated: {`${user.isValid}`}</p>
<button
    href=""
    className="btn btn-warning"
    onClick={this.onUpdate.bind(this, user.username)}
    >
    Validate
    </button>
<button
    href=""
    className="btn btn-danger"
    onClick={this.onDelete.bind(this, user.username)}
    >
    Delete
    </button>
    <Link  className="btn btn-info " to= {`/edit/${user.username}`} >Edit</Link>
    
</div>
</div>
    
    </div>
    
    ))}
    <div className= 'container' style={{maxWidth: '25rem'}}>
        <br />
        <Link  className="btn btn-primary " to="/AdminLogin">Logout</Link>
        </div>
</div>
)

         
       
    
}
}