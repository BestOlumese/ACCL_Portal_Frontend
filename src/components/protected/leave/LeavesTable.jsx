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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useLeaves from "@/hooks/use-leaves";
import DeleteLeaveConfirmation from "./DeleteLeaveConfirmation";
import { cn } from "@/lib/utils";
import * as XLSX from 'xlsx';


export default function LeavesTable() {
  const [open, setOpen] = useState(false);
  const [leavesId, setLeavesId] = useState(0);
  const { isPending, data } = useLeaves();
  const excelData = data?.data;
  excelData?.forEach((item, index) => {
    delete item.id;
    delete item.user_firstname;
    delete item.user_lastname;
    delete item.director;
    delete item.director_firstname;
    delete item.director_lastname;
    delete item.created_at;

    item['s/n'] = index + 1;
  });
  console.log(excelData);

  const exportToExcel = (data, fileName) => {
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
  
    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Export to Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
    <Button size="sm" className="mb-2" onClick={() => exportToExcel(excelData, 'Leaves')}>Export to excel</Button>
      {data?.data.length > 0 ? (
        <>
          <Table className="w-full max-md:w-[800px] border border-blue-300 shadow-sm">
            <TableCaption className="text-blue-600 font-medium">
              A list of your leaves requested.
            </TableCaption>
            <TableHeader className="bg-blue-200">
              <TableRow>
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
                        <DropdownMenuItem>
                          <Link to={`/edit-leave/${leave.id}`}>Edit leave</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setLeavesId(leave.id);
                            setOpen(true);
                          }}
                        >
                          Delete leave
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DeleteLeaveConfirmation
            open={open}
            setOpen={setOpen}
            id={leavesId}
          />
        </>
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          You don't have any leaves request made
        </h1>
      )}
    </>
  );
}
