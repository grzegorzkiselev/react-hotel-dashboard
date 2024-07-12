import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === "all"
    ? null
    : { field: "status", value: filterValue, method: "eq" };

  const {
    isLoading,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter }),
  });

  return { bookings: bookings ?? [], isLoading };
};
