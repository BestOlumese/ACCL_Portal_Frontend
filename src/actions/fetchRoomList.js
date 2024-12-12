import api from "@/api";

export const fetchRoomList = async () => {
  const room = api.get("room/list/");

  return room;
};
