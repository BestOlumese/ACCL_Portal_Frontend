import api from "@/api";

export const fetchLeavesList = async () => {
  const leaves = api.get("leave/list/");

  return leaves;
};
