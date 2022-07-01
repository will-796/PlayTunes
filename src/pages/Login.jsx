import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputUser: '',
      isButtonDisabled: true,
      loading: false,
      logued: false,
    };
  }

  componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  buttonCondition = () => {
    const { inputUser } = this.state;
    const inputMinLength = 3;
    this.setState({ isButtonDisabled: inputUser.length < inputMinLength });
  };

  onHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputUser: value }, this.buttonCondition);
  };

  onHandleClick = () => {
    this.setState({ loading: true }, async () => {
      const { inputUser } = this.state;
      await createUser({ name: inputUser });
      if (this.isMount) {
        this.setState({ loading: false, logued: true });
      }
    });
  };

  render() {
    const { inputUser, isButtonDisabled, loading, logued } = this.state;
    return (
      <div data-testid="page-login">
        {logued && <Redirect to="/search" />}
        {loading && <Loading />}
        <input
          data-testid="login-name-input"
          type="text"
          name="inputUser"
          value={ inputUser }
          onChange={ this.onHandleChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          onClick={ this.onHandleClick }
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}
