import { deleteRoom } from "@/actions/deleteRoom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteRoomMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success("Room deleted successfully!!");
      queryClient.invalidateQueries({ queryKey: ["room-list"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
