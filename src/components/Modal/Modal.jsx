import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const onEscapeClick = e => {
      if (e.code === 'Escape') onClose();
    };

    document.body.style = 'overflow-y: hidden';
    window.addEventListener('keydown', onEscapeClick);

    return () => {
      document.body.style = 'overflow-y: auto';
      window.removeEventListener('keydown', onEscapeClick);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalBox>{children}</ModalBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
