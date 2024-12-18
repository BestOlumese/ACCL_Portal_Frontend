import { editRoom } from "@/actions/editRoom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditRoomMutation(id) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => editRoom(values, id),
    onSuccess: () => {
        toast.success("Room edited successfully!!")
        navigate("/rooms");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
