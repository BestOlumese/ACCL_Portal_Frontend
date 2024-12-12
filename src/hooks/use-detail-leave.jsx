import { fetchLeaveById } from "@/actions/fetchLeaveById";
import { useQuery } from "@tanstack/react-query";

export default function useDetailLeave(id) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["detail-leave", id], // Pass the id as part of the query key for caching
    queryFn: () => fetchLeaveById(id), // Pass a function reference, not the invocation
  });

  return { isPending, isError, data, error };
}
