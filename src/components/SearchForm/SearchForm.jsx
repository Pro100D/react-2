import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    serchValue: '',
  };

  handleChange = e => {
    this.setState({ serchValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.serchValue) {
      window.alert('введите что то');
      return;
    }
    this.props.onSubmit(this.state.serchValue);
    this.setState({ serchValue: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.handleChange}
          value={this.state.serchValue}
        />
      </SearchFormStyled>
    );
  }
}
