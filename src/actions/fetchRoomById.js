import api from "@/api";

export const fetchRoomById = async (id) => {
  const room = api.get(`room/${id}/`);

  return room;
};
