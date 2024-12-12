import CreateRoomForm from "@/components/protected/room/CreateRoomForm";

export default function CreateRoom() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Create Room</h1>
      <div className="mt-4">
        <CreateRoomForm />
      </div>
    </div>
  );
}
