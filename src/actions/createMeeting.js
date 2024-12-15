import api from "@/api";

export const createMeeting = async (values) => {
  const response = await api.post("meeting/", values);
  return response.data;
};
