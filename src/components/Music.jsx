import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Music extends Component {
  render() {
    const { artistName, collectionName, collectionId } = this.props;
    return (
      <div>
        <p>{artistName}</p>
        <p>{collectionName}</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          {collectionId}
        </Link>
      </div>
    );
  }
}

Music.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
};
