import api from "@/api";

export const fetchRooms = async () => {
  const rooms = api.get("room/");

  return rooms;
};
