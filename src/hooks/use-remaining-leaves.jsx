import { fetchRemainingLeave } from "@/actions/fetchRemainingLeave";
import { useQuery } from "@tanstack/react-query";

export default function useRemainingLeave(id) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["remaining-leaves"], // Pass the id as part of the query key for caching
    queryFn: () => fetchRemainingLeave(id), // Pass a function reference, not the invocation
  });

  return { isPending, isError, data, error };
}
