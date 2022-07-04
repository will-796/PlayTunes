import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = { favoritesSongs: [], loading: false };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    this.setState({ loading: true }, async () => {
      const favoritesSongs = await getFavoriteSongs();
      this.setState({ favoritesSongs, loading: false });
    });
  };

  render() {
    const { loading, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            {favoritesSongs.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                favoriteSongs={ favoritesSongs }
                updateFavoriteSongs={ this.fetchApi }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
