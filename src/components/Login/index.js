import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.entrar = this.entrar.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    //verificar se usuario está logado
    if (firebase.getCurrent()) {
      return this.props.history.replace('dashboard');
    }
  }

  entrar(e) {
    e.preventDefault();
    this.login();
  }

  login = async () => {
    const { email, password } = this.state;

    try {
      await firebase.login(email, password).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          alert('Este usuário não existe!');
        } else if (error.code === 'auth/wrong-password') {
          alert('Senha incorreta!');
        } else {
          alert('Error: ' + error.code);
          return null;
        }
      });

      this.props.history.replace('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id='login-form'>
          <label>Email</label>
          <input
            type='email'
            autoComplete='off'
            autoFocus
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder='email@email.com'
          />

          <label>Senha</label>
          <input
            type='password'
            autoComplete='off'
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder='senha123'
          />

          <button type='submit'>Entrar</button>
          <Link to='/register'>Não tem cadastro?</Link>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
