import { createLeave } from "@/actions/createLeave";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useTakeALeaveMutation() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createLeave,
    onSuccess: () => {
        toast.success("Your request has been made successfully!!")
        navigate("/leaves");
    },
    onError: (error) => {
      toast.error(error.response.data[0])
      console.log(error);
    },
  });

  return mutation;
}
