import { createRoom } from "@/actions/createRoom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useCreateRoomMutation() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
        toast.success("Your room has been created successfully!!")
        navigate("/rooms");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
