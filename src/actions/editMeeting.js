import api from "@/api";

export const editMeeting = async (values, id) => {
  const response = await api.patch(`meeting/${id}/`, values);
  return response.data;
};
