import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import useDeleteRoomMutation from "@/hooks/mutations/useDeleteRoomMutation";
  import { Loader2 } from "lucide-react";
  
  export default function DeleteRoomConfirmation({ open, setOpen, id }) {
    const mutation = useDeleteRoomMutation();
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              room and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutation.mutate(id)} disabled={mutation.isPending}>
              {mutation.isPending ? (
                  <div className="flex gap-2 items-center">
                      Continue
                      <Loader2 className="size-6" />
                  </div>
              ) : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  