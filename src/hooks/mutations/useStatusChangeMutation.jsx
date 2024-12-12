import { editLeaveStatus } from "@/actions/editLeaveStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useStatusChangeMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editLeaveStatus,
    onSuccess: () => {
      toast.success("Action was successfully!!");
      queryClient.invalidateQueries({ queryKey: ["leaves-list"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
