import {
    Day,
    Inject,
    ScheduleComponent,
    WorkWeek,
    Month,
    Week,
  } from "@syncfusion/ej2-react-schedule";
  import React, { useRef } from "react";
  import { extend, registerLicense } from "@syncfusion/ej2-base";
  import useMeeting from "@/hooks/use-meeting";
  
  // Replace 'your-license-key' with the actual key
  registerLicense(
    "Ngo9BigBOggjHTQxAR8/V1NMaF5cXmVCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH1ceXRSRWlfV0JyXEU="
  );
  
  export default function ScheduleMeetings() {
    const { isPending, data } = useMeeting();
    const scheduleObj = useRef(null);
  
    if (isPending) {
      return <h1>Loading...</h1>;
    }
  
    const getRandomColor = () => {
      return `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`;
    };
  
    // Transform data
    const transformedData = data?.data?.map((item) => ({
      Id: item.id,
      Subject: item.title,
      StartTime: `${item.day}T${item.start_time}.000Z`,
      EndTime: `${item.day}T${item.end_time}.000Z`,
      Description: item.content, // Extra notes
      Notes: item.extra_notes || 'N/A', // Extra notes
      RoomName: item.room_name, // Room name
      UserName: item.user_name, // User name
      CategoryColor: 'hsl(221.2, 83.2%, 53.3%)',
    }));
  
    const dataS = extend([], transformedData, null, true);
  
    // Customize quick info template
    const quickInfoTemplate = (props) => {
      if (props) {
        return (
          <div className="text-[16px] flex flex-col gap-2">
            <p>
              <b className="block">Content:</b> {props.Description}
            </p>
            <p>
              <b className="block">Start Time:</b> {new Date(props.StartTime).toLocaleString()}
            </p>
            <p>
              <b className="block">End Time:</b> {new Date(props.EndTime).toLocaleString()}
            </p>
            <p>
              <b className="block">Room:</b> {props.RoomName}
            </p>
            <p>
              <b className="block">User:</b> {props.UserName}
            </p>
            <p>
              <b className="block">Extra Notes:</b> {props.Notes}
            </p>
          </div>
        );
      }
      return null;
    };
  
    return (
      <ScheduleComponent
        height="650px"
        selectedDate={new Date()}
        ref={scheduleObj}
        eventSettings={{
          dataSource: dataS,
          allowEditing: false, // Disable editing
          allowAdding: false, // Disable adding
          allowDeleting: false, // Disable deleting
        }}
        quickInfoTemplates={{
          content: quickInfoTemplate, // Use custom template for quick info
        }}
      >
        <Inject services={[Day, Week, WorkWeek, Month]} />
      </ScheduleComponent>
    );
  }
  