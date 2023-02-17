import styled from 'styled-components';

export const List = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
  grid-gap: 16px;
  margin: 0 auto;
  padding-top: 24px;
`;
