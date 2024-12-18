import api from "@/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (values) => {
      // Return the response from the API call
      const response = await api.post("auth/token/", values);
      return response.data; // Assuming the API response contains a `data` property
    },
    onSuccess: (data) => {
      toast.success("User logged in successfully");
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response.data.detail);
    },
  });

  return mutation;
}
