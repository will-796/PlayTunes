import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: { name: '', email: '', image: '', description: '' },
      isButtonDisabled: true,
      redirect: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.isMount = true;
  }

  componentWillUnmount() {
    this.isMount = false;
  }

  onSaveButton = () => {
    this.setState({ loading: true }, async () => {
      const { user } = this.state;
      await updateUser(user);
      if (this.isMount) {
        this.setState({ redirect: true });
      }
    });
  };

  validadeForm = () => {
    const { user } = this.state;
    const { name, email, image, description } = user;

    const validEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (name && validEmail && image && description) {
      return false;
    }
    return true;
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    const { user } = this.state;
    const newUser = { ...user };
    newUser[name] = value;
    this.setState({ user: newUser }, () => this.setState(
      {
        isButtonDisabled: this.validadeForm(),
      },
    ));
  };

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading, isButtonDisabled, redirect } = this.state;
    if (redirect) return (<Redirect to="/profile" />);
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                type="text"
                name="name"
                id="name"
                onChange={ this.onHandleChange }
                value={ user.name }
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                data-testid="edit-input-email"
                type="email"
                name="email"
                id="email"
                onChange={ this.onHandleChange }
                value={ user.email }
              />
            </label>
            <label htmlFor="image">
              Imagem
              <input
                data-testid="edit-input-image"
                type="text"
                name="image"
                id="image"
                onChange={ this.onHandleChange }
                value={ user.image }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                data-testid="edit-input-description"
                type="text"
                name="description"
                id="description"
                onChange={ this.onHandleChange }
                value={ user.description }
              />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.onSaveButton }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}
