import api from "@/api";

export const editRoom = async (values, id) => {
  const response = await api.patch(`room/${id}/`, values);
  return response.data;
};
