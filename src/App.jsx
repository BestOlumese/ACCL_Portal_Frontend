import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Signup from "./pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import ProtectedLayout from "./components/protected/ProtectedLayout";
import Home from "./pages/protected/Home";
import CreateMeeting from "./pages/protected/meetings/CreateMeeting";
import YourMeetings from "./pages/protected/meetings/YourMeetings";
import EditMeeting from "./pages/protected/meetings/EditMeeting";
import ViewMeeting from "./pages/protected/meetings/ViewMeeting";
import TakeALeave from "./pages/protected/leave/TakeALeave";
import Leaves from "./pages/protected/leave/Leaves";
import EditLeave from "./pages/protected/leave/EditLeave";
import AdminLayout from "./components/protected/AdminLayout";
import CreateRoom from "./pages/protected/room/CreateRoom";
import Rooms from "./pages/protected/room/Rooms";
import EditRoom from "./pages/protected/room/EditRoom";
import ViewLeaves from "./pages/protected/leave/ViewLeaves";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="your-meetings" element={<YourMeetings />} />
            <Route path="create-meeting" element={<CreateMeeting />} />
            <Route path="view-meeting/:id" element={<ViewMeeting />} />
            <Route path="edit-meeting/:id" element={<EditMeeting />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="edit-leave/:id" element={<EditLeave />} />
            <Route path="take-a-leave" element={<TakeALeave />} />
          </Route>

          <Route path="" element={<ProtectedLayout />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="rooms" element={<Rooms />} />
              <Route path="create-room" element={<CreateRoom />} />
              <Route path="edit-room/:id" element={<EditRoom />} />
              <Route path="view-leaves" element={<ViewLeaves />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
