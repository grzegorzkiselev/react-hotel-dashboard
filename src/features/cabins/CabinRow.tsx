import { ImgHTMLAttributes, useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Modal } from "../../ui/Modal";
import { Table } from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import { useDeleteCabin } from "./useDeleteCabin";

const Img = styled.img<ImgHTMLAttributes<HTMLImageElement>>`
  /* transform: scale(1.66666) translateX(-2px); */
  transform: scale(1.5) translateX(-7px);

  display: block;

  aspect-ratio: 3 / 2;
  width: 6.4rem;

  object-fit: cover;
  object-position: center;
`;

const Cabin = styled.div`
  font-family: Sono;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-family: Sono;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: Sono;
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const {
    id: cabinId,
    name,
    max_capacity,
    regular_price,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const handleDuplicate = () => {
    createCabin({
      name: `Copy of ${name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  };

  return (
    <>
      <Table.Row role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {max_capacity} guests</div>
        <Price>{formatCurrency(regular_price)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <div>
          <button onClick={handleDuplicate} disabled={isDeleting}><HiSquare2Stack /></button>
          <Modal>
            <Modal.Open opens="edit">
              <button onClick={() => setShowForm((show) => !show)} disabled={isDeleting}><HiPencil /></button>
            </Modal.Open >
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window >
            <Modal.Open opens="delete">
              <button><HiTrash /></button>
            </Modal.Open >
            <Modal.Window name="delete">
              <ConfirmDelete
                resource="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window  >
          </Modal>
        </div>
      </Table.Row >
    </>
  );
}

export default CabinRow;
