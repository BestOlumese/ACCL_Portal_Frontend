import { fetchRoomById } from "@/actions/fetchRoomById";
import { useQuery } from "@tanstack/react-query";

export default function useDetailRoom(id) {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["detail-room", id], // Pass the id as part of the query key for caching
    queryFn: () => fetchRoomById(id), // Pass a function reference, not the invocation
  });

  return { isPending, isError, data, error };
}
