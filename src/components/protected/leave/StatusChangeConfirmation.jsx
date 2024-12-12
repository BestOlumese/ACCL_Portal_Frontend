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
import useStatusChangeMutation from "@/hooks/mutations/useStatusChangeMutation";
import { Loader2 } from "lucide-react";

export default function StatusChangeConfirmation({
  open,
  setOpen,
  id,
  status,
}) {
  const mutation = useStatusChangeMutation();
  const data = { id: id, status: status };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to proceed with
            this action
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => mutation.mutate(data)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <div className="flex gap-2 items-center">
                Continue
                <Loader2 className="size-6" />
              </div>
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
