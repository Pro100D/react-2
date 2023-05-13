import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    serchValue: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchValue, page } = this.state;

    if (prevState.serchValue !== serchValue || prevState.page !== page) {
      ImageService.getImages(serchValue, page).then(console.log);
    }
  }

  handleSubmit = value => {
    this.setState({ serchValue: value });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
