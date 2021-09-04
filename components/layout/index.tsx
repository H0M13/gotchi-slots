import { styled } from 'theme';

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.mediaQueries.phone} {
    max-width: ${({ theme }) => `${theme.grid.container.maxWidth.xs}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.tablet} {
    max-width: ${({ theme }) => `${theme.grid.container.maxWidth.sm}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.laptop} {
    max-width: ${({ theme }) => `${theme.grid.container.maxWidth.md}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.laptopL} {
    max-width: ${({ theme }) => `${theme.grid.container.maxWidth.lg}px`};
  }

  @media ${({ theme }) => theme.mediaQueries.desktop} {
    max-width: ${({ theme }) => `${theme.grid.container.maxWidth.xl}px`};
  }
`