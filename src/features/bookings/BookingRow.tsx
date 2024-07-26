import { format } from "date-fns";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Menus } from "../../ui/Menus";
import { Modal } from "../../ui/Modal";
import { Table } from "../../ui/Table";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

// v1
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Cabin = styled.div`
  font-family: Sono;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    font-size: 1.2rem;
    color: var(--color-grey-500);
  }
`;

const Amount = styled.div`
  font-family: Sono;
  font-weight: 500;
`;

export const BookingRow = ({
  booking: {
    id: booking_id,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    created_at,
    start_date,
    end_date,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    num_nights,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    num_guests,
    total_price,
    status,
    guests: { full_name: guest_name, email },
    cabins: { name: cabin_name },
  },
}) => {
  // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const navigate = useNavigate();

  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  // We will not allow editing at this point, as it's too complex for bookings... People just need to delete a booking and create a new one

  const statusToTagName = {
    "unconfirmed": "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    // role='row'
    <Table.Row>
      <Cabin>{cabin_name}</Cabin>

      <Stacked>
        <span>{guest_name}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        {/* <span>
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}{" "}
          &rarr; {num_nights} night stay
        </span> */}
        <span>
          {format(new Date(start_date), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end_date), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking_id} />
          <Menus.List id={booking_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${booking_id}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && <Menus.Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkIn/${booking_id}`)}
            >
              Check in
            </Menus.Button>}
            {status === "checked-in" && <Menus.Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(booking_id)}
              disabled={isCheckingOut}
            >
              Check Out
            </Menus.Button>}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>
                Delete booking
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resource="booking"
            onConfirm={() => { deleteBooking(booking_id) }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};
