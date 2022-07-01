import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      albumName: '',
      loading: false,
      musicResults: [],
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
      this.setState({
        artistName: results[0].artistName,
        albumName: results[0].collectionName,
        musicResults: results,
        loading: false,
      });
    });
  };

  render() {
    const { musicResults, artistName, albumName, loading } = this.state;
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
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
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
