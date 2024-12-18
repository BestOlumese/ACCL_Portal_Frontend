import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import useLeavesList from "@/hooks/use-leaves-list";
import StatusChangeConfirmation from "./StatusChangeConfirmation";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";

export default function DirectorLeavesTable() {
  const { decodedToken } = useAuth();

  const [open, setOpen] = useState(false);
  const [leavesId, setLeavesId] = useState(0);
  const [status, setStatus] = useState("");
  const { isPending, data } = useLeavesList(decodedToken.user_id);
  console.log(data);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {data?.data?.length > 0 ? (
        <>
          <Table className="w-full max-md:w-[800px] border border-blue-300 shadow-sm">
            <TableCaption className="text-blue-600 font-medium">
              A list of your leaves requested.
            </TableCaption>
            <TableHeader className="bg-blue-200">
              <TableRow>
                <TableHead className="text-blue-800 font-semibold">
                  Username
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Reason
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Start Date
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  End Date
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-blue-800 font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((leave) => (
                <TableRow
                  key={leave.id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <TableCell className="font-medium text-blue-900">
                    {leave.username}
                  </TableCell>
                  <TableCell className="font-medium text-blue-900">
                    {leave.content}
                  </TableCell>
                  <TableCell className="text-blue-700">
                    {leave.start_date}
                  </TableCell>
                  <TableCell className="text-blue-700">
                    {leave.end_date}
                  </TableCell>
                  <TableCell
                    className={cn("capitalize", {
                      "text-yellow-400": leave.status == "pending",
                      "text-green-600": leave.status == "approved",
                      "text-red-600": leave.status == "disapproved",
                    })}
                  >
                    {leave.status}
                  </TableCell>
                  <TableCell className="text-blue-700 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          className="text-green-600"
                          onClick={() => {
                            setLeavesId(leave.id);
                            setOpen(true);
                            setStatus("approved");
                          }}
                        >
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setLeavesId(leave.id);
                            setOpen(true);
                            setStatus("disapproved");
                          }}
                        >
                          Disapprove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <StatusChangeConfirmation
            open={open}
            setOpen={setOpen}
            id={leavesId}
            status={status}
          />
        </>
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          You don't have any leaves requests
        </h1>
      )}
    </>
  );
}