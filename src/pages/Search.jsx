import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = { inputSearch: '',
      isButtonDisabled: true };
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

  render() {
    const { inputUser, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        Search
        <input
          data-testid="search-artist-input"
          type="text"
          name="inputSearch"
          value={ inputUser }
          onChange={ this.onHandleChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}
