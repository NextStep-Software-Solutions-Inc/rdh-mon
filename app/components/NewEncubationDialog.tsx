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
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

export default function NewEncubationDialog() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-1">
          New Encubation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Encubation Cycle</DialogTitle>
            <DialogDescription>
              This will create a new batch of encubation. Fill in the details below to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start" className="text-right">
                Start
              </Label>
              <Input 
                className="col-span-3"
                id="start"
                name="start" 
                type="datetime-local"

                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end" className="text-right">
                End
              </Label>
              <Input 
                className="col-span-3"
                id="end"
                name="end" 
                type="datetime-local"
                />
            </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eggs" className="text-right">
                Total Eggs
              </Label>
              <Input 
                className="col-span-3"
                id="eggs"
                name="eggs" 
                type="text"
                />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loss" className="text-right">
                Candling Interval
              </Label>
              <Input 
                className="col-span-3"
                id="end"
                name="end" 
                type="number"
                inputMode="numeric"
                defaultValue={7}
                />
            </div>
          </div>
          <DialogFooter>
              <DialogClose>
                  <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button type="submit">Start Encubation</Button>
              </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
