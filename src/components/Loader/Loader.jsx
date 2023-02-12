import { ThreeDots } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export const Loader = () => (
  <Wrapper>
    <ThreeDots
      height="100"
      width="100"
      radius="9"
      color="#df3e89"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  </Wrapper>
);
