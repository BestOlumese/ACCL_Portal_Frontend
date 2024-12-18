import { fetchMeeting } from "@/actions/fetchMeeting";
import { useQuery } from "@tanstack/react-query";

export default function useMeeting() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["meetings"],
    queryFn: fetchMeeting,
  });

  return { isPending, isError, data, error };
}
