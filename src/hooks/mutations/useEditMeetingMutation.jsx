import { createMeeting } from "@/actions/createMeeting";
import { editMeeting } from "@/actions/editMeeting";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditMeetingMutation(id) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => editMeeting(values, id),
    onSuccess: () => {
        toast.success("Meeting edited successfully!!")
        navigate("/your-meetings");
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
