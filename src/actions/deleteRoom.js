import api from "@/api";

export const deleteRoom = async (id) => {
  const response = await api.delete(`room/${id}/`);
  return response.data;
};
