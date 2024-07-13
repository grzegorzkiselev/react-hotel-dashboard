import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import BookingDataBox from "../bookings/BookingDataBox";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { useCheckin } from "./useCheckin";
import styled from "styled-components";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();

  const moveBack = useMoveBack();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { checkin, isCheckingIn } = useCheckin();

  useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

  if (isLoading || isLoadingSettings) {
    return <Spinner />;
  }

  const {
    id: booking_id,
    guests,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice =
    num_nights * settings.breakfast_price * num_guests;

  const handleCheckin = () => {
    if (!confirmPaid) {
      return;
    }

    if (addBreakfast) {
      checkin({ booking_id,
        has_breakfast: true,
        extras_price: optionalBreakfastPrice,
        total_price: total_price + optionalBreakfastPrice,
      });
    } else {
      checkin({ booking_id });
    }
  };

  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type='horizontal'>
        <Heading type='h1'>Check in booking #{booking_id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* LATER */}
      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            id='breakfast'
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          // If the guest has already paid online, we can't even undo this
          disabled={isCheckingIn || confirmPaid}
          id='confirm'
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
              total_price + optionalBreakfastPrice,
            )} (${formatCurrency(total_price)} + ${formatCurrency(
              optionalBreakfastPrice,
            )} for breakfast)`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
          Check in booking #{booking_id}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
