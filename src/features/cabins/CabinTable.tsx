import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import { Table } from "../../ui/Table";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  padding: 1.6rem 2.4rem;

  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.4px;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`;

const CabinTable = () => {
  const { cabins, isLoading } = useCabins();

  if (isLoading) {
    return <Spinner />;
  }

  return <Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
    <Table.Header>
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
    </Table.Header>
    <Table.Body data={cabins} render={(cabin) => (
      <CabinRow cabin={cabin} key={cabin.id} />
    )} />

    {/* {cabins.map((cabin) => (
      <CabinRow cabin={cabin} key={cabin.id} />
    ))} */}
  </Table>;
};

export default CabinTable;
