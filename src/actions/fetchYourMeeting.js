import api from "@/api";

export const fetchYourMeeting = async () => {
  const meeting = api.get("meeting/");

  return meeting;
};
