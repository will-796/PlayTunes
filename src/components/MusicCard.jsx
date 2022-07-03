import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = { favorite: props.favoriteSongs };
  }

  // componentDidMount() {
  //   const { trackId, favoriteSongs } = this.props;
  //   this.setState({
  //     favorite: favoriteSongs,
  //   });
  // }

  onHandleChange = ({ target }) => {
    const { checked } = target;
    this.setState({ loading: true, favorite: checked }, async () => {
      const { trackName, previewUrl, trackId, updateFavoriteSongs } = this.props;
      const { favorite } = this.state;
      if (favorite) {
        await addSong({ trackId, trackName, previewUrl });
      } else {
        await removeSong({ trackId, trackName, previewUrl });
      }
      updateFavoriteSongs();
      this.setState({ loading: false });
    });
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
          <label htmlFor="favorite">
            Favorita
            <input
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              name="favorite"
              id="favorite"
              checked={ favorite }
              onChange={ this.onHandleChange }
            />
          </label>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  updateFavoriteSongs: PropTypes.func.isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
};
