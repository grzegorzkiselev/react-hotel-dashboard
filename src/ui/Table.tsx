import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  overflow: hidden;

  font-size: 1.4rem;

  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
`;

const CommonRow = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;

  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.4px;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  background-color: var(--color-grey-50);

  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  margin: 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
`;

const TableContext = createContext();

const Table = ({ columns, children }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable >
    </TableContext.Provider>
  );
};

const Header = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" as="header" columns={columns}>
      {children}
    </StyledHeader>
  );
};

const Row = ({ children }) => {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
};

const Body = ({ data, render }) => {
  return data.length
    ? <StyledBody>{data.map(render)}</StyledBody>
    : <Empty>No data to show at this moment</Empty>;
};


Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export { Table };
