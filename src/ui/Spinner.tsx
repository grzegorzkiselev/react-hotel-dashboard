import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  aspect-ratio: 1;
  width: 6.4rem;
  margin: 4.8rem auto;

  background: radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-600));
  border-radius: 50%;

  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);

  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
