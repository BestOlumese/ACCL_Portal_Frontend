import TakeALeaveForm from "@/components/protected/leave/TakeALeaveForm";

export default function TakeALeave() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Take A Leave</h1>
      <div className="mt-4">
        <TakeALeaveForm />
      </div>
    </div>
  );
}
