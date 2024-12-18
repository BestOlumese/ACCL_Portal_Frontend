import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { User2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function MeetingCard({ meeting }) {
  return (
    <Link to={`/view-meeting/${meeting.id}`}>
      <Card className="border border-primary bg-white shadow-sm p-3 hover:shadow-md">
        <CardTitle className="p-0">
          <h1 className="font-bold text-xl text-primary">{meeting.title}</h1>
        </CardTitle>
        <CardContent className="p-0 pt-2 flex flex-col gap-1">
          <p className="font-medium text-md  flex justify-between items-center">
            <span className="text-primary">Date:</span> {meeting.day}
          </p>
          <p className="font-medium text-md flex justify-between items-center">
            <span className="text-primary">Starting:</span> {meeting.start_time}
          </p>
          <p className="font-medium text-md  flex justify-between items-center">
            <span className="text-primary">Ending:</span> {meeting.end_time}
          </p>
        </CardContent>
        <CardFooter className="p-0 pt-4">
          <div className="flex gap-2 items-center text-primary font-medium">
            <User2 />
            {meeting.username}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
