import useDetailMeeting from "@/hooks/use-detail-meeting";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewMeeting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError } = useDetailMeeting(id);

  if (isError) {
    toast.error("something went wrong");
    navigate("/");
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="mt-4 space-y-4">
        <div>
          <h1 className="font-bold text-3xl text-primary">
            {data?.data.title}
          </h1>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">Description:</h2>
          <p>{data?.data.content}</p>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">Meeting Date:</h2>
          <p>{data?.data.day}</p>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">
            Meeting Begining Time:
          </h2>
          <p>{data?.data.start_time}</p>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">
            Meeting Closing Time:
          </h2>
          <p>{data?.data.end_time}</p>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">Room:</h2>
          <p>{data?.data.room_name}</p>
        </div>
        <div>
          <h2 className="font-medium text-primary mb-1">User:</h2>
          <p>{data?.data.user_name}</p>
        </div>
        {data?.data.extra_notes && (
          <div>
            <h2 className="font-medium text-primary mb-1">Extra Notes:</h2>
            <p>{data?.data.extra_notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
