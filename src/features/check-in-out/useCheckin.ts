import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn }
    = useMutation({
      mutationFn: ({ booking_id, ...options }) => updateBooking(
        booking_id,
        {
          ...options,
          "status": "checked-in",
          "is_paid": true,
        }),
      onSuccess: (data) => {
        toast.success(`Booking #${data.id} successfuly checked in`);
        queryClient.invalidateQueries({ active: true });
        navigate("/");
      },
      onError: () => {
        toast.error("There was an error while checking in");
      },
    });

  return { checkin, isCheckingIn };
};
