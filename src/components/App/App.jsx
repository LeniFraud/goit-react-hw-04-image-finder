import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPicturesByQuery } from 'services/pixabay-api';
import {
  Searchbar,
  ImageGallery,
  Loader,
  LoadButton,
  TopButton,
} from 'components';

export class App extends Component {
  state = {
    pictures: [],
    query: '',
    page: 1,
    showLoadButton: false,
    showTopButton: false,
    status: 'idle',
  };

  componentDidMount() {
    window.addEventListener('scroll', this.onWindowScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({
        status: 'pending',
        showLoadButton: false,
      });

      getPicturesByQuery(query, page)
        .then(({ hits, totalHits }) => {
          this.totalImagesAlert(hits.length, totalHits, page);
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...hits],
            showLoadButton: Math.ceil(hits.length / 12),
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ status: 'idle' }));
    }
  }

  searchFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }

    this.setState({
      pictures: [],
      query,
      page: 1,
    });
  };

  totalImagesAlert = (value, amount, page) => {
    if (value === 0 && amount === 0) {
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if ((value === 0) & (amount !== 0)) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
    if (value !== 0 && page === 1) {
      toast.success(`Hooray! We found ${amount} images.`);
    }
  };

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onWindowScroll = () => {
    document.documentElement.scrollTop > 20
      ? this.setState({ showTopButton: true })
      : this.setState({ showTopButton: false });
  };

  onTopBtnClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    const { pictures, showLoadButton, showTopButton, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.searchFormSubmit} />
        {!!pictures.length && <ImageGallery pictures={pictures} />}
        {status === 'pending' && <Loader />}
        {showLoadButton && <LoadButton onClick={this.onLoadMoreBtnClick} />}
        {showTopButton && <TopButton onClick={this.onTopBtnClick} />}
        <ToastContainer autoClose={2500} newestOnTop theme="colored" />
      </>
    );
  }
}
