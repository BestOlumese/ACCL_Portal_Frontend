import YourMeetingTable from "@/components/protected/meeting/YourMeetingTable";

export default function YourMeetings() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Your Meetings</h1>
      <div className="mt-4">
        <YourMeetingTable />
      </div>
    </div>
  );
}
