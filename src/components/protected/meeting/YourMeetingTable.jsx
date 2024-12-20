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

import useYourMeeting from "@/hooks/use-your-meeting";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import DeleteMeetingConfirmation from "./DeleteMeetingConfirmation";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function YourMeetingTable() {
  const [open, setOpen] = useState(false);
  const [meetingId, setMeetingId] = useState(0);
  const { isPending, data } = useYourMeeting();
  const excelData = data?.data.map((item) => ({
    ...item,
  }));
  excelData?.forEach((item, index) => {
    delete item.id;
    delete item.user_firstname;
    delete item.user_lastname;
    delete item.room;
    delete item.created_at;

    item["s/n"] = index + 1;
  });
  console.log(excelData);

  const exportToExcel = (data, fileName) => {
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Export to Excel
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Button
        size="sm"
        className="mb-2"
        onClick={() => exportToExcel(excelData, "Meetings")}
      >
        Export to excel
      </Button>
      {data?.data.length > 0 ? (
        <>
          <Table className="w-full max-md:w-[800px] border border-blue-300 shadow-sm">
            <TableCaption className="text-blue-600 font-medium">
              A list of your meetings created.
            </TableCaption>
            <TableHeader className="bg-blue-200">
              <TableRow>
                <TableHead className="text-blue-800 font-semibold">
                  Title
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Day
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Start Time
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  End Time
                </TableHead>
                <TableHead className="text-blue-800 font-semibold">
                  Room
                </TableHead>
                <TableHead className="text-blue-800 font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((meeting) => (
                <TableRow
                  key={meeting.id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <TableCell className="font-medium text-blue-900">
                    {meeting.title}
                  </TableCell>
                  <TableCell className="text-blue-700">{meeting.day}</TableCell>
                  <TableCell className="text-blue-700">
                    {meeting.start_time}
                  </TableCell>
                  <TableCell className="text-blue-700">
                    {meeting.end_time}
                  </TableCell>
                  <TableCell className="text-blue-700">
                    {meeting.room_name}
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
                          <Link to={`/view-meeting/${meeting.id}`}>
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link to={`/edit-meeting/${meeting.id}`}>
                            Edit meeting
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setMeetingId(meeting.id);
                            setOpen(true);
                          }}
                        >
                          Delete meeting
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DeleteMeetingConfirmation
            open={open}
            setOpen={setOpen}
            id={meetingId}
          />
        </>
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          You don't have any meeting available
        </h1>
      )}
    </>
  );
}
