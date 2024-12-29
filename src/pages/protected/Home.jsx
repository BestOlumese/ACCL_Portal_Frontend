import useMeeting from "@/hooks/use-meeting";
import MeetingCard from "./meetings/MeetingCard";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useRoom from "@/hooks/use-room";
import { useEffect, useState } from "react";

export default function Home() {
  const { isPending, data } = useMeeting();
  const [roomFilter, setRoomFilter] = useState("");
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const { data: room } = useRoom();

  // Prepare data for Excel export
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

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  // Update filtered meetings when data or roomFilter changes
  useEffect(() => {
    if (data?.data) {
      const filtered = roomFilter
        ? data.data.filter((item) => item.room_name === roomFilter)
        : data.data; // Show all meetings if no filter is applied
      setFilteredMeetings(filtered);
    }
  }, [data?.data, roomFilter]);

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="font-bold text-3xl text-primary mb-4">Meetings</h1>
      <div className="flex gap-4 items-center">
        <Button
          size="sm"
          onClick={() => exportToExcel(excelData, "All Meetings")}
        >
          Export to excel
        </Button>
        <Select
          value={roomFilter || undefined} // Reset to default if roomFilter is empty
          onValueChange={(value) => setRoomFilter(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by room" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Rooms</SelectLabel>
              {room?.data.map((room_data) => (
                <SelectItem key={room_data.id} value={room_data.name}>
                  {room_data.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {roomFilter && (
          <Button
            size="sm"
            onClick={() => setRoomFilter(null)} // Clear the filter
            variant="destructive"
          >
            Clear Filter
          </Button>
        )}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))
        ) : (
          <p className="text-center text-primary text-lg font-medium">
            No Available Meeting
          </p>
        )}
      </div>
    </div>
  );
}
