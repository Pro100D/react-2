import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    serchValue: '',
    page: 1,
    imagesData: [],
    showBtn: false,
    isEmpy: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchValue, page } = this.state;

    if (prevState.serchValue !== serchValue || prevState.page !== page) {
      ImageService.getImages(serchValue, page).then(
        ({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpy: true });
            return;
          }
          this.setState(prevState => ({
            imagesData: [...prevState.imagesData, ...photos],
            // showBtn: page * ImageService.perPage < total_results,
            showBtn: page < Math.ceil(total_results / ImageService.perPage),
          }));
        }
      );
    }
  }

  handleSubmit = value => {
    this.setState({ serchValue: value });
  };

  render() {
    const { imagesData, isEmpy } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {isEmpy && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        <Grid>
          {imagesData.map(({ id, alt, avg_color, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
