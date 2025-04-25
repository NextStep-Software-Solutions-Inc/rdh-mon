"use client";

import { Gift } from "lucide-react"
import { useSearchParams } from "react-router"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

interface EncubationCompleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EncubationCompleteDialog({ open, onOpenChange }: EncubationCompleteDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Encubation Complete</DialogTitle>
          <DialogDescription>
            The encubation process is complete. You can now proceed reviewing the results and taking further actions.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          {/*Conffetii icon  */}
        <Gift size={80} className="text-green-500" />
        </div>
        <DialogFooter className="sm:justify-center">
            <DialogClose>
                <Button onClick={() => onOpenChange(false)} variant="outline">Okay</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
