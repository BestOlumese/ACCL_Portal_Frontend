import api from "@/api";

export const fetchLeaves = async () => {
  const leaves = api.get("leave/");

  return leaves;
};
