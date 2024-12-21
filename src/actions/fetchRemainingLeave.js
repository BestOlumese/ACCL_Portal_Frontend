import api from "@/api";

export const fetchRemainingLeave = async (id) => {
  const data = api.get(`auth/remaining/${id}/`);

  return data;
};
