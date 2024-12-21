import { MdMeetingRoom } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { RiListView } from "react-icons/ri";
import { FcLeave } from "react-icons/fc";
import { MdOutlineRoomPreferences } from "react-icons/md";

export const meetingsLinks = [
  {
    name: "All Meetings",
    url: "/",
    icon: MdMeetingRoom,
  },
  {
    name: "Your Meetings",
    url: "/your-meetings",
    icon: RiListView,
  },
  {
    name: "Create Meeting",
    url: "/create-meeting",
    icon: IoCreateOutline,
  },
];

export const leavesLinks = [
  {
    name: "All Leaves",
    url: "/leaves",
    icon: FcLeave,
  },
  {
    name: "Take a leave",
    url: "/take-a-leave",
    icon: IoCreateOutline,
  },
];

export const directorLinks = [
  {
    name: "View Leaves",
    url: "/view-director-leaves",
    icon: RiListView,
  },
];

export const adminLinks = [
  {
    name: "Rooms",
    url: "/rooms",
    icon: MdOutlineRoomPreferences,
  },
  {
    name: "Create Room",
    url: "/create-room",
    icon: IoCreateOutline,
  },
  {
    name: "View Leaves",
    url: "/view-leaves",
    icon: RiListView,
  },
];
