import api from "@/api";

export const editLeaveStatus = async (values) => {
  const response = await api.patch(`leave/${values.id}/status/`, { status: values.status });
  return response.data;
};
