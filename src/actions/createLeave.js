import api from "@/api";

export const createLeave = async (values) => {
  const response = await api.post("leave/", values);
  return response.data;
};
