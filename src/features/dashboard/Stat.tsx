import styled from "styled-components";
import { box } from "styles/styles";

const StyledStat = styled.div`
  ${box}
  padding: 1.6rem;

  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  gap: 0.4rem 1.6rem;
`;

const Icon = styled.div`
  display: flex;
  grid-row: 1 / -1;
  align-items: center;
  justify-content: center;

  aspect-ratio: 1;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);
  border-radius: 50%;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;

  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const Value = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1;

  /* color: var(--color-grey-600); */
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
