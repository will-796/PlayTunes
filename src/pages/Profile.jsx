import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: { name: '', email: '', image: '', description: '' },
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const user = await getUser();
    this.setState({ user, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <img data-testid="profile-image" src={ user.image } alt={ user.name } />
            <div>{user.description}</div>

            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}
