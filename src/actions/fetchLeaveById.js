import api from "@/api";

export const fetchLeaveById = async (id) => {
  const leave = api.get(`leave/${id}/`);

  return leave;
};
