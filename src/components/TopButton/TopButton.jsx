import { BsArrowUpCircleFill } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { Button } from './TopButton.styled';

export const TopButton = ({ onClick }) => (
  <Button type="button" aria-label="Go to the top" onClick={onClick}>
    <BsArrowUpCircleFill size={48} />
  </Button>
);

TopButton.propTypes = { onClick: PropTypes.func.isRequired };
