import { deleteLeave } from "@/actions/deleteLeave";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteLeaveMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteLeave,
    onSuccess: () => {
      toast.success("Leave deleted successfully!!");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    },
    onError: (error) => {
      toast.error(error.response.data[0])
      console.log(error);
    },
  });

  return mutation;
}
