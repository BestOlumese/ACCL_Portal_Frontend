import { deleteMeeting } from "@/actions/deleteMeeting";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteMeetingMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMeeting,
    onSuccess: () => {
      toast.success("Meeting deleted successfully!!");
      queryClient.invalidateQueries({ queryKey: ["your-meeting"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
