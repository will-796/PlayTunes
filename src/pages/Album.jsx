import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      loading: false,
      musicResults: [],
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  fetchApi = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true }, async () => {
      const results = await getMusics(id);
      const favorite = await getFavoriteSongs();
      this.setState({
        artistName: results[0].artistName,
        albumName: results[0].collectionName,
        musicResults: results,
        favoriteSongs: favorite,
        loading: false,
      });
    });
  };

  render() {
    const { musicResults, artistName, albumName, loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div>
            <p data-testid="artist-name">{artistName}</p>
            <p data-testid="album-name">{albumName}</p>
            {musicResults
              .filter((music) => music.kind === 'song')
              .map((music, index) => (
                <MusicCard
                  key={ index }
                  trackId={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  favoriteSongs={ favoriteSongs }
                />
              ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
