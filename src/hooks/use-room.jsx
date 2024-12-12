import { fetchRoomList } from "@/actions/fetchRoomList";
import { useQuery } from "@tanstack/react-query";

export default function useRoom() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["room-list"],
    queryFn: fetchRoomList,
  });

  return { isPending, isError, data, error };
}
