import { fetchLeavesList } from "@/actions/fetchLeavesList";
import { useQuery } from "@tanstack/react-query";

export default function useLeavesList(id) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["leaves-list"],
    queryFn: () => fetchLeavesList(id),
  });

  return { isPending, isError, data, error };
}
