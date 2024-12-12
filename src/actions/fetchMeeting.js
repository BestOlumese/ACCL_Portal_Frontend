import api from "@/api";

export const fetchMeeting = async () => {
  const meeting = api.get("meeting/list/");

  return meeting;
};
