import AdminLeavesTable from "@/components/protected/leave/AdminLeavesTable";

export default function ViewLeaves() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Recent Leaves Requests</h1>
      <div className="mt-4">
        <AdminLeavesTable />
      </div>
    </div>
  );
}
