import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Music from './Music';

export default class MusicList extends Component {
  render() {
    const { searchResults } = this.props;
    return (
      <div>
        {searchResults.length === 0
          ? 'Nenhum álbum foi encontrado'
          : searchResults.map((value, index) => (
            <Music
              key={ index }
              artistName={ value.artistName }
              collectionName={ value.collectionName }
              collectionId={ value.collectionId }
            />
          ))}
      </div>
    );
  }
}

MusicList.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
