import { Component } from 'react';
import { Button } from './Button';
import { Gallery } from './Gallery';
import { getTrendingMovies } from './services/movieAPI';
import { moviesMaper } from './utils/moviesmaper';

export class App extends Component {
  state = {
    movies: [],
    isGalleryOpen: false,
    isLoading: false,
    page: 1,
    error: null,
    currentImg: null,
  };

  componentDidUpdate(_, prevState) {
    const { isGalleryOpen, page } = this.state;
    if (
      (prevState.isGalleryOpen !== isGalleryOpen && isGalleryOpen) ||
      (prevState.page !== page && isGalleryOpen)
    ) {
      this.fetchMovies();
    }
    if (prevState.isGalleryOpen !== isGalleryOpen && !isGalleryOpen) {
      this.setState({ movies: [] });
    }
  }

  toggleGallery = () => {
    this.setState(prevState => ({
      isGalleryOpen: !prevState.isGalleryOpen,
    }));
  };
  fetchMovies = () => {
    const { page } = this.state;
    this.setState({ isLoading: true });

    getTrendingMovies(page)
      .then(({ data: { results } }) =>
        this.setState(prevState => ({
          movies: [...prevState.movies, ...moviesMaper(results)],
        }))
      )
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isloading: false }));
  };

  deleteMovie = movieId => {
    this.setState(prevState => ({
      movies: prevState.movies.filter(({ id }) => id !== movieId),
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = img => {
    this.setState;
  };

  render() {
    const { movies, isGalleryOpen } = this.state;
    return (
      <>
        <Button
          text={isGalleryOpen ? 'Hide movies' : 'Show movies'}
          handleClick={this.toggleGallery}
        />
        {isGalleryOpen && (
          <>
            <Gallery movies={movies} onDelete={this.deleteMovie} />
            <Button text="Load more" handleClick={this.loadMore} />
          </>
        )}
      </>
    );
  }
}
