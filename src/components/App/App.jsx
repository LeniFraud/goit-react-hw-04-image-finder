import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  getImagesByQuery,
  alertOnResolved,
  alertOnRejected,
  alertOnRepeatedQuery,
} from 'services';
import {
  Searchbar,
  ImageGallery,
  Loader,
  LoadButton,
  TopButton,
} from 'components';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [status, setStatus] = useState(Status.IDLE);

  const showLoadButton =
    totalImages !== images.length && status === Status.RESOLVED;

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  useEffect(() => {
    if (!query) return;

    setStatus(Status.PENDING);
    getImagesByQuery(query, page)
      .then(({ images, totalImages }) => {
        alertOnResolved(images.length, totalImages, page);
        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);
        setStatus(Status.RESOLVED);
      })
      .catch(() => {
        setStatus(Status.REJECTED);
        alertOnRejected();
      });
  }, [page, query]);

  const searchFormSubmit = searchQuery => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (normalizedQuery === query) return alertOnRepeatedQuery(query);

    setImages([]);
    setQuery(normalizedQuery);
    setPage(1);
    setTotalImages(0);
  };

  const onLoadMoreBtnClick = () => setPage(prevPage => prevPage + 1);

  const onWindowScroll = () => {
    document.documentElement.scrollTop > 20
      ? setShowTopButton(true)
      : setShowTopButton(false);
  };

  const onTopBtnClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Searchbar onSubmit={searchFormSubmit} />
      {!!images.length && <ImageGallery images={images} />}
      {status === Status.PENDING && <Loader />}
      {showLoadButton && <LoadButton onClick={onLoadMoreBtnClick} />}
      {showTopButton && <TopButton onClick={onTopBtnClick} />}
      <ToastContainer autoClose={2500} newestOnTop theme="colored" />
    </>
  );
};
