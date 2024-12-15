import api from "@/api";

export const fetchLeavesList = async (id) => {
  if (!id) {
    const leaves = api.get("leave/list/");

    return leaves;
  } else {
    const leaves = api.get("leave/directorlist/");

    return leaves;
  }
};
