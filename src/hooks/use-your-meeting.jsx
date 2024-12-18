import { fetchYourMeeting } from "@/actions/fetchYourMeeting";
import { useQuery } from "@tanstack/react-query";

export default function useYourMeeting() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["your-meeting"],
    queryFn: fetchYourMeeting,
  });

  return { isPending, isError, data, error };
}
