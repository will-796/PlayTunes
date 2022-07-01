import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicList from '../components/MusicList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      isButtonDisabled: true,
      loading: false,
      artistSearch: '',
      searchResults: [],
    };
  }

  buttonCondition = () => {
    const { inputSearch } = this.state;
    const inputMinLength = 2;
    this.setState({ isButtonDisabled: inputSearch.length < inputMinLength });
  };

  onHandleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputSearch: value }, this.buttonCondition);
  };

  fetchSearch = () => {};

  onHandleClick = () => {
    const { inputSearch } = this.state;
    this.setState(
      {
        loading: true,
        artistSearch: inputSearch,
        inputSearch: '',
        isButtonDisabled: true,
      },
      async () => {
        this.setState({
          searchResults: await searchAlbumsAPI(inputSearch),
          loading: false,
        });
      },
    );
  };

  render() {
    const {
      inputSearch,
      isButtonDisabled,
      artistSearch,
      searchResults,
      loading,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          data-testid="search-artist-input"
          type="text"
          name="inputSearch"
          value={ inputSearch }
          onChange={ this.onHandleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onHandleClick }
        >
          Pesquisar
        </button>
        {loading ? (
          <Loading />
        ) : (
          artistSearch && (
            <div>
              <span>
                Resultado de álbuns de:
                {' '}
                {artistSearch}
              </span>
              <MusicList searchResults={ searchResults } />
            </div>
          )
        )}
      </div>
    );
  }
}
