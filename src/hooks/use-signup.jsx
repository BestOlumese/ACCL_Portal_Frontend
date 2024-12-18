import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
    const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (values) => {
      // Return the response from the API call
      const response = await api.post("auth/register/", values);
      return response.data; // Assuming the API response contains a `data` property
    },
    onSuccess: () => {
      toast.success("User created successfully");
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response.data.username[0]);
    },
  });

  return mutation;
}
