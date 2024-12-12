import api from "@/api";

export const deleteMeeting = async (id) => {
  const response = await api.delete(`meeting/${id}/`);
  return response.data;
};
