import api from "@/api";

export const deleteLeave = async (id) => {
  const response = await api.delete(`leave/${id}/`);
  return response.data;
};
