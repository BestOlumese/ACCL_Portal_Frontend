import api from "@/api";

export const fetchMeetingById = async (id) => {
  const room = api.get(`meeting/${id}/`);

  return room;
};
