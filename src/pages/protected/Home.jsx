import useMeeting from "@/hooks/use-meeting";
import MeetingCard from "./meetings/MeetingCard";

export default function Home() {
  const { isPending, data } = useMeeting();

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Meetings</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.data.length > 0 ? data?.data.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        )) : <p className="text-center text-primary text-lg font-medium">No Available Meeting</p>}
      </div>
    </div>
  );
}
