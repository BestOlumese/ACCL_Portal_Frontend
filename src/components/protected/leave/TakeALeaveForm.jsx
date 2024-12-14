import { leaveSchema } from "@/schemas";
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
import { Textarea } from "@/components/ui/textarea";

import DatePicker from "@/components/ui/date-picker";
import { Loader2 } from "lucide-react";
import useTakeALeaveMutation from "@/hooks/mutations/useTakeALeaveMutation";
import useDirector from "@/hooks/use-director";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function TakeALeaveForm() {
  const { data, isPending, isError } = useDirector();
  const navigate = useNavigate();
  const mutation = useTakeALeaveMutation();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      content: "",
      start_date: "",
      end_date: "",
      director: 0,
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
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker control={form.control} name="start_date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DatePicker control={form.control} name="end_date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Director</FormLabel>
              <FormControl>
                <Select
                  value={field.value ? String(field.value) : ""} // Convert value to string for the Select component
                  onValueChange={(value) => field.onChange(Number(value))} // Parse value to number
                >
                  <SelectTrigger>
                    <SelectValue>
                      {/* Display selected director name */}
                      {field.value
                        ? data?.data.find((director) => director.id === field.value)
                            ?.username || "Select your director"
                        : "Select your director"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data.map((director_data) => (
                      <SelectItem
                        key={director_data.id}
                        value={String(director_data.id)}
                      >
                        {director_data.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="animate-spin size-6" />
          ) : (
            "Take A Leave"
          )}
        </Button>
      </form>
    </Form>
  );
}
