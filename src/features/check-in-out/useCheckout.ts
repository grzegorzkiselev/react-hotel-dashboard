import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut }
    = useMutation({
      mutationFn: (booking_id) => updateBooking(
        booking_id,
        {
          "status": "checked-out",
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} successfuly checked out`);
        queryClient.invalidateQueries({ active: true });
      },
      onError: () => {
        toast.error("There was an error while checking out");
      },
    });

  return { checkout, isCheckingOut };
};
