import { fetchDirectorList } from "@/actions/fetchDirectorList";
import { useQuery } from "@tanstack/react-query";

export default function useDirector() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["director-list"],
    queryFn: fetchDirectorList,
  });

  return { isPending, isError, data, error };
}
