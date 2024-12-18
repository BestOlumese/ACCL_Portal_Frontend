import { roomSchema } from "@/schemas";
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

import { Loader2 } from "lucide-react";
import useEditRoomMutation from "@/hooks/mutations/useEditRoomMutation";
import { Input } from "@/components/ui/input";

export default function EditRoomForm({ roomDetail, roomId }) {
  const mutation = useEditRoomMutation(roomId);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: roomDetail?.data.name,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the room name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="animate-spin size-6" />
          ) : (
            "Edit Room"
          )}
        </Button>
      </form>
    </Form>
  );
}
