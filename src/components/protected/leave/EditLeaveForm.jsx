import { leaveSchema, meetingSchema } from "@/schemas";
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
import useEditLeaveMutation from "@/hooks/mutations/useEditLeaveMutation";

export default function EditLeaveForm({ leaveDetail, leaveId }) {
  const mutation = useEditLeaveMutation(leaveId);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      content: leaveDetail?.data.content,
      start_date: new Date(leaveDetail?.data.start_date),
      end_date: new Date(leaveDetail?.data.end_date),
    },
  });

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
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="animate-spin size-6" />
          ) : (
            "Edit Leave"
          )}
        </Button>
      </form>
    </Form>
  );
}
