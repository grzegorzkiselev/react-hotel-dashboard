import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import { Modal } from "../../ui/Modal";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import { useCheckout } from "../check-in-out/useCheckout";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  align-items: center;
  display: flex;
  gap: 2.4rem;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
  // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const {checkout, isCheckingOut} = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  if (isLoading) {
    return <Spinner />;
  }
  if (!booking) {
    return <Empty resource='booking' />;
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { id: booking_id, status } = booking;

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{booking_id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && <Button
          icon={<HiArrowDownOnSquare />}
          onClick={() => navigate(`/checkIn/${booking_id}`)}
        >
          Check in
        </Button>}

        {status === "checked-in" && <Button
          icon={<HiArrowUpOnSquare />}
          onClick={() => checkout(booking_id)}
          disabled={isCheckingOut}
        >
          Check Out
        </Button>}

        <Modal>
          <Modal.Open opens="delete">
            <Button
              variation="danger"
            >
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resource="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(booking_id, { onSettled: () => { navigate(-1) } })
              }}
            >
            </ConfirmDelete>
          </Modal.Window>
        </Modal>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup >

      {/* <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Toggle opens='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Toggle>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resource='booking'
              // These options will be passed wherever the function gets called, and they determine what happens next
              onConfirm={(options) => deleteBooking(bookingId, options)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal> */}
    </>
  );
}

export default BookingDetail;
