import api from "@/api";

export const createRoom = async (values) => {
  const response = await api.post("room/", values);
  return response.data;
};
