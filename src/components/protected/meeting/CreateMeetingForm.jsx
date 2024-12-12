import { meetingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DatePicker from "@/components/ui/date-picker";
import useRoom from "@/hooks/use-room";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCreateMeetingMutation from "@/hooks/mutations/useCreateMeetingMutation";
import { Loader2 } from "lucide-react";

export default function CreateMeetingForm() {
  const { error, data, isPending, isError } = useRoom();
  const navigate = useNavigate();
  const mutation = useCreateMeetingMutation();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      title: "",
      content: "",
      day: "",
      start_time: "",
      end_time: "",
      extra_notes: "",
      room: 0,
    },
  });

  if (isError) {
    toast.error("something went wrong");
    navigate("/");
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the meeting title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the meeting content"
                  className="h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="day"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day</FormLabel>
              <FormControl>
                <DatePicker control={form.control} name="day" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <FormControl>
                <Select
                  value={field.value ? String(field.value) : ""} // Convert value to string for the Select component
                  onValueChange={(value) => field.onChange(Number(value))} // Parse value to number
                >
                  <SelectTrigger>
                    <SelectValue>
                      {/* Display selected room name */}
                      {field.value
                        ? data?.data.find((room) => room.id === field.value)
                            ?.name || "Select your room"
                        : "Select your room"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data.map((room_data) => (
                      <SelectItem
                        key={room_data.id}
                        value={String(room_data.id)}
                      >
                        {room_data.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="extra_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Extra Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This is optional and can be left empty"
                  className="h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="animate-spin size-6" />
          ) : (
            "Create Meeting"
          )}
        </Button>
      </form>
    </Form>
  );
}
