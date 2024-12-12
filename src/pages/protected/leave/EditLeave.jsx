import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EditLeaveForm from "@/components/protected/leave/EditLeaveForm";
import useDetailLeave from "@/hooks/use-detail-leave";

export default function EditLeave() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: leaveDetail, isPending, isError } = useDetailLeave(id);
  if (isError) {
    toast.error("something went wrong");
    navigate("/");
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Edit Leave</h1>
      <div className="mt-4">
        <EditLeaveForm leaveDetail={leaveDetail} leaveId={id} />
      </div>
    </div>
  );
}
