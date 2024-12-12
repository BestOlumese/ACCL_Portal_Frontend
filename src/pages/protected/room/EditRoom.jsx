import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EditRoomForm from "@/components/protected/room/EditRoomForm";
import useDetailRoom from "@/hooks/use-detail-room";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: roomDetail, isPending, isError } = useDetailRoom(id);
  if (isError) {
    toast.error("something went wrong");
    navigate("/");
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Edit Room</h1>
      <div className="mt-4">
        <EditRoomForm roomDetail={roomDetail} roomId={id} />
      </div>
    </div>
  );
}
