import { fetchMeetingById } from "@/actions/fetchMeetingById";
import { useQuery } from "@tanstack/react-query";

export default function useDetailMeeting(id) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["detail-meeting", id], // Pass the id as part of the query key for caching
    queryFn: () => fetchMeetingById(id), // Pass a function reference, not the invocation
  });

  return { isPending, isError, data, error };
}
