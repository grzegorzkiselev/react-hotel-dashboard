import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useBookings = () => {
  const {
    isLoading,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings: bookings ?? [], isLoading };
};
