import { fetchLeaves } from "@/actions/fetchLeaves";
import { useQuery } from "@tanstack/react-query";

export default function useLeaves() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["leaves"],
    queryFn: fetchLeaves,
  });

  return { isPending, isError, data, error };
}
