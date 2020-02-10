import React, {Component} from "react";
import { Link } from 'react-router-dom'

export default class SignIn extends Component{
  state = {
    username: null,
    password: null,
    firstname: null,
    lastname: null
  }
  
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.username, this.state.password);
    return(
      alert("Logeado")
    )
  }

  render(){

    return (
        <div>
          <h2>Member login</h2>
          <form onSubmit={this.handleSubmit}>
          <br/>
            <div>
              <label>
                <input placeholder="Usuario" type="text" id="username" onChange={this.handleChange}/>
              </label>
            </div>
            <div>
              <label>
                <input placeholder="Contraseña" type="password" id="password" onChange={this.handleChange}/>
              </label>
            </div>
            <button onClick={this.handleSubmit} >Iniciar sesión</button>
          </form>
          <div>
          <Link to='/auth/signup'>
              Don't you have an account?
          </Link>
          </div>
        </div>
    )
  }
}



