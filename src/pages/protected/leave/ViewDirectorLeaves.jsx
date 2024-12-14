import DirectorLeavesTable from "@/components/protected/leave/DirectorLeavesTable";

export default function ViewDirectorLeaves() {
  return (
    <div>
      <h1 className="font-bold text-3xl text-primary">Recent Leaves Requests</h1>
      <div className="mt-4">
        <DirectorLeavesTable />
      </div>
    </div>
  );
}
