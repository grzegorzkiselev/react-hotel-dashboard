import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Table } from "../../ui/Table";

import { format } from "date-fns";
import Tag from "../../ui/Tag";
import { formatCurrency } from "../../utils/helpers";
// import { useDeleteBooking } from "./useDeleteBooking";
// import { useCheckout } from "features/check-in-out/useCheckout";
// import { formatCurrency, formatDistanceFromNow } from "utils/helpers";

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
    created_at,
    start_date,
    end_date,
    num_nights,
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

      {/* VIDEO we could export this into own component... */}
      {/* <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking_id} />
          <Menus.List id={booking_id}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${booking_id}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${booking_id}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                onClick={() => checkout(booking_id)}
                disabled={isCheckingOut}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
            <Menus.Button>Delete</Menus.Button>

            {/* Now it gets a bit confusing... */}
      {/* <Modal.Toggle opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Toggle>
          </Menus.List>
        </Menus.Menu> */}

      {/* This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility */}
      {/* <Modal.Window name='delete'>
          <ConfirmDelete
            resource='booking'
            // These options will be passed wherever the function gets called, and they determine what happens next
            onConfirm={(options) => deleteBooking(booking_id, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal> */}

      {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
    </Table.Row>
  );
};
