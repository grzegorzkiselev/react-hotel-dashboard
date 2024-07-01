import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isEditing } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isEditing };
};