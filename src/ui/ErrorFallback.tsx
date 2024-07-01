import styled from "styled-components";

const StyledErrorFallback = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
  padding: 4.8rem;

  background-color: var(--color-grey-50);
`;

const Box = styled.div`
  flex: 0 1 96rem;

  padding: 4.8rem;

  text-align: center;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    margin-bottom: 3.2rem;
    font-family: Sono;
    color: var(--color-grey-500);
  }
`;
