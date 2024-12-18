import EditMeetingForm from "@/components/protected/meeting/EditMeetingForm";
import useDetailMeeting from "@/hooks/use-detail-meeting";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function EditMeeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: meetingDetail, isPending, isError } = useDetailMeeting(id);
  if (isError) {
    toast.error("something went wrong");
    navigate("/");
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Edit Meeting</h1>
      <div className="mt-4">
        <EditMeetingForm meetingDetail={meetingDetail} meetingId={id} />
      </div>
    </div>
  );
}
