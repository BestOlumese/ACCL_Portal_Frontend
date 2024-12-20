import LeavesTable from "@/components/protected/leave/LeavesTable";
import useAuth from "@/hooks/use-auth";
import useRemainingLeave from "@/hooks/use-remaining-leaves";

export default function Leaves() {
  const {decodedToken} = useAuth();
  const {data, isPending} = useRemainingLeave(decodedToken?.user_id);
  console.log(data);
  

  if(isPending) {
    return <h1>Loading...</h1>
  }
  
  return (
    <div>
      <div className="flex justify-between max-sm:flex-col max-sm:justify-center max-sm:gap-2 items-center">
        <h1 className="font-bold text-3xl text-primary">Leaves</h1>
        <div className="flex flex-col max-sm:items-center">
          <p className="font-medium text-md text-primary">Remaining Leaves: {data?.data?.leaves}</p>
          <p className="font-medium text-md text-primary">Total Leaves: {data?.data?.total_leaves}</p>
        </div>
      </div>
      <div className="mt-4">
        <LeavesTable />
      </div>
    </div>
  );
}
