import api from "@/api";

export const fetchDirectorList = async () => {
  const director = api.get("auth/directors/");

  return director;
};
