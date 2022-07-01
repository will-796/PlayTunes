import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = { favorite: false, loading: false };
  }

  componentDidUpdate() {
    if (favorite) {
      this.fetchFavorite();
    }
  }

  fetchFavorite = async () => {
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({ loading: false });
  };

  onHandleChange = ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true, favorite: checked });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        {loading ? (
          <Loading />
        ) : (
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id="favorite"
            checked={ favorite }
            onChange={ this.onHandleChange }
          />
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
