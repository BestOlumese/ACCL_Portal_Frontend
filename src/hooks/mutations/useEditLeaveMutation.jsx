import { editLeave } from "@/actions/editLeave";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useEditLeaveMutation(id) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (values) => editLeave(values, id),
    onSuccess: () => {
        toast.success("Leave edited successfully!!")
        navigate("/leaves");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
}
