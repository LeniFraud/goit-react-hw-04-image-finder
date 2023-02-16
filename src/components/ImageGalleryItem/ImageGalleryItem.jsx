import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components';
import { pageSmoothScroll } from 'services';
import { Item, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  tags,
  webformatURL,
  largeImageURL,
  isScrollAnchor,
}) => {
  const [showModal, setShowModal] = useState(false);
  const elementToScroll = useRef(null);

  useEffect(() => {
    if (!isScrollAnchor) return;
    pageSmoothScroll(elementToScroll.current, 88);
  }, [isScrollAnchor]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Item>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
        ref={elementToScroll}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  isScrollAnchor: PropTypes.bool.isRequired,
};
