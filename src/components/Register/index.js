import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.register = this.register.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  register(e) {
    e.preventDefault();
    this.onRegister();
  }

  onRegister = async () => {
    try {
      const { email, password, name } = this.state;

      await firebase.register(name, email, password);
      this.props.history.replace('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div>
        <h1 className='register-h1'>Novo Usuário</h1>

        <form onSubmit={this.register} id='register-form'>
          <label>Nome</label>
          <input
            type='text'
            value={this.state.name}
            placeholder='My Name '
            autoFocus
            autoComplete='off'
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <label>Email</label>
          <input
            type='email'
            value={this.state.email}
            placeholder='teste@teste.com'
            autoComplete='off'
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <label>Senha</label>
          <input
            type='text'
            value={this.state.password}
            placeholder='password123'
            autoComplete='off'
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />

          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);
