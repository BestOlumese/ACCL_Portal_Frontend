import { createMeeting } from "@/actions/createMeeting";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateMeetingMutation() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createMeeting,
    onSuccess: (data) => {
        toast.success("Meeting created successfully!!")
        navigate("/");
    },
    onError: (error) => {
      console.log(error);
      if(error.response.data.non_field_errors) {
        toast.error(error.response.data.non_field_errors)
      }
    },
  });

  return mutation;
}
