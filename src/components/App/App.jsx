import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImagesByQuery, alertOnResolved, alertOnRejected } from 'services';
import {
  Searchbar,
  ImageGallery,
  Loader,
  LoadButton,
  TopButton,
} from 'components';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalImages: 0,
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
      });

      getImagesByQuery(query, page)
        .then(({ images, totalImages }) => {
          alertOnResolved(images.length, totalImages, page);
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
            totalImages,
            status: 'resolved',
          }));
        })
        .catch(() => {
          this.setState({
            status: 'rejected',
          });
          alertOnRejected();
        });
    }
  }

  searchFormSubmit = query => {
    if (query === this.state.query) {
      return;
    }

    this.setState({
      images: [],
      query,
      page: 1,
      totalImages: 0,
    });
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
    const { images, totalImages, showTopButton, status } = this.state;
    const showLoadButton =
      totalImages !== images.length && status === 'resolved';

    return (
      <>
        <Searchbar onSubmit={this.searchFormSubmit} />
        {!!images.length && <ImageGallery images={images} />}
        {status === 'pending' && <Loader />}
        {showLoadButton && <LoadButton onClick={this.onLoadMoreBtnClick} />}
        {showTopButton && <TopButton onClick={this.onTopBtnClick} />}
        <ToastContainer autoClose={2500} newestOnTop theme="colored" />
      </>
    );
  }
}
