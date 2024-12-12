import RoomsTable from "@/components/protected/room/RoomsTable";

export default function Rooms() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Rooms</h1>
      <div className="mt-4">
        <RoomsTable />
      </div>
    </div>
  );
}
