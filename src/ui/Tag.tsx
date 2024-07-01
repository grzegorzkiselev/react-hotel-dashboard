import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  padding: 0.4rem 1.2rem;

  font-size: 1.1rem;
  font-weight: 600;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  text-transform: uppercase;

  background-color: var(--color-${(props) => props.type}-100);
  border-radius: 100px;
`;

export default Tag;
