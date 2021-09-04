import { styled } from 'theme';

export const ButtonContainer = styled.div`
  display: flex;
  & > * + * {
    margin-left: 1.2rem;
  }
`

export const ButtonContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 0.4rem;
  justify-content: space-between;
  align-items: center;
`

export const GotchiIconWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.light1};
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    height: 110%;
    width: 110%;
  }
`

export const AavegotchiDetails = styled.div`
  margin-left: 0.8rem;
  p {
    font-size: 1.2rem;
    text-align: right;
    margin: 0;
    color: ${({ theme }) => theme.colors.light0}
  }
  p:last-of-type {
    color: ${({ theme }) => theme.colors.light1}
  }
`