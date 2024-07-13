import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import ButtonGroup from "../../ui/ButtonGroup";
import { Menus } from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

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

  const { id: bookingId, status } = booking;

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
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
