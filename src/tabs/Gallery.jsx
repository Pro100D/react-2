import { Component } from 'react';

import * as ImageService from 'service/image-service';
import {
  Button,
  SearchForm,
  Grid,
  GridItem,
  Text,
  CardItem,
  Loader,
} from 'components';

export class Gallery extends Component {
  state = {
    serchValue: '',
    page: 1,
    imagesData: [],
    showBtn: false,
    isEmpy: false,
    err: '',
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { serchValue, page } = this.state;

    if (prevState.serchValue !== serchValue || prevState.page !== page) {
      this.setState({ isLoading: true });
      ImageService.getImages(serchValue, page)
        .then(({ photos, total_results }) => {
          if (!photos.length) {
            this.setState({ isEmpy: true });
            return;
          }
          this.setState(prevState => ({
            imagesData: [...prevState.imagesData, ...photos],
            // showBtn: page * ImageService.perPage < total_results,
            showBtn: page < Math.ceil(total_results / ImageService.perPage),
          }));
        })
        .catch(err => this.setState({ err: err.message }))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleSubmit = value => {
    this.setState({
      serchValue: value,
      page: 1,
      imagesData: [],
      err: '',
      isEmpy: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { imagesData, isEmpy, showBtn, err, isLoading } = this.state;

    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {isEmpy && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {err && <Text textAlign="center">Sorry. {err}😭</Text>}
        <Grid>
          {imagesData.map(({ id, alt, avg_color, src: { large } }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {showBtn && <Button onClick={this.loadMore}>Load More</Button>}
        {isLoading && <Loader />}
      </>
    );
  }
}
