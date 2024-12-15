import api from "@/api";

export const editLeave = async (values, id) => {
  const response = await api.patch(`leave/${id}/`, values);
  return response.data;
};
