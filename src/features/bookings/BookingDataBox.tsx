import { format, isToday } from "date-fns";
import styled from "styled-components";

import { HiOutlineChatBubbleBottomCenterText, HiOutlineCheckCircle, HiOutlineCurrencyDollar, HiOutlineHomeModern } from "react-icons/hi2";

// import { box } from "../../styles/GlobalStyles";
import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

// ${box} /* padding: 3.2rem 4rem; */
const StyledBookingDataBox = styled.section`
  overflow: hidden;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* padding: 2.4rem 4rem; */
  padding: 2rem 4rem;

  font-size: 1.8rem;
  font-weight: 500;
  color: #e0e7ff;

  background-color: var(--color-brand-500);

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  & div:first-child {
    display: flex;
    gap: 1.6rem;
    align-items: center;

    font-size: 1.8rem;
    font-weight: 600;
  }

  & span {
    margin-left: 4px;
    font-family: Sono;
    font-size: 2rem;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  /* font-size: 1.8rem; */
  margin-bottom: 1.6rem;

  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 2.4rem;
  padding: 1.6rem 3.2rem;

  color: ${(props) =>
    props.is_paid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  background-color: ${(props) =>
    props.is_paid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  border-radius: var(--border-radius-sm);

  & p:last-child {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: currentcolor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    start_date,
    end_date,
    num_nights,
    num_guests,
    cabin_price,
    extras_price,
    total_price,
    has_breakfast,
    observations,
    is_paid,
    guests: { full_name: guest_name, email, country, country_flag, national_id },
    cabins: { name: cabin_name },
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {num_nights} nights in Cabin <span>{cabin_name}</span>
          </p>
        </div>

        <p>
          {format(new Date(start_date), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start_date))
            ? "Today"
            : formatDistanceFromNow(start_date)}
          ) &mdash; {format(new Date(end_date), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {country_flag && <Flag src={country_flag} alt={`Flag of ${country}`} />}
          <p>
            {guest_name} {num_guests > 1 ? `+ ${num_guests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {national_id}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label='Observations'
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label='Breakfast included?'>
          {has_breakfast ? "Yes" : "No"}
        </DataItem>

        <Price is_paid={is_paid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(total_price)}

            {has_breakfast &&
              ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                extras_price,
              )} breakfast)`}
          </DataItem>

          <p>{is_paid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
