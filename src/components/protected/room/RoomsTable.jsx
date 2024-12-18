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
import useRoom from "@/hooks/use-room";
import DeleteRoomConfirmation from "./DeleteRoomConfirmation";

export default function RoomsTable() {
  const [open, setOpen] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const { isPending, data } = useRoom();

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {data?.data.length > 0 ? (
        <>
          <Table className="w-full border border-blue-300 shadow-sm">
            <TableCaption className="text-blue-600 font-medium">
              A list of your rooms created.
            </TableCaption>
            <TableHeader className="bg-blue-200">
              <TableRow>
                <TableHead className="text-blue-800 font-semibold">
                  Name
                </TableHead>
                <TableHead className="text-blue-800 font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((room) => (
                <TableRow
                  key={room.id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <TableCell className="font-medium text-blue-900">
                    {room.name}
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
                          <Link to={`/edit-room/${room.id}`}>Edit room</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setRoomId(room.id);
                            setOpen(true);
                          }}
                        >
                          Delete room
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DeleteRoomConfirmation
            open={open}
            setOpen={setOpen}
            id={roomId}
          />
        </>
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          You don't have any room request made
        </h1>
      )}
    </>
  );
}
