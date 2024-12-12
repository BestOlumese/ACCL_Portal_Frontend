import { fetchLeavesList } from "@/actions/fetchLeavesList";
import { useQuery } from "@tanstack/react-query";

export default function useLeavesList() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["leaves-list"],
    queryFn: fetchLeavesList,
  });

  return { isPending, isError, data, error };
}
