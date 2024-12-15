import CreateMeetingForm from "@/components/protected/meeting/CreateMeetingForm";

export default function CreateMeeting() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Create Meeting</h1>
      <div className="mt-4">
        <CreateMeetingForm />
      </div>
    </div>
  );
}
