import LeavesTable from "@/components/protected/leave/LeavesTable";

export default function Leaves() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Leaves</h1>
      <div className="mt-4">
        <LeavesTable />
      </div>
    </div>
  );
}
