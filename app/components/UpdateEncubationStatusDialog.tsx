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


const intevals = [7, 14, 21, 28]

export default function UpdateEncubationStatusDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sticky bottom-0" size="lg">
          Update Encubation Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Encubation Status</DialogTitle>
          <DialogDescription>
            This will update the encubation status and send a notification to the user.
            Are you sure you want to proceed?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interval" className="text-right">
              Interval
            </Label>
            <Select>
                <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Select Interval</SelectLabel>
                    {
                        intevals.map(interval => (<SelectItem value={interval.toString()}>{interval}th Day</SelectItem>))
                    }
                    </SelectGroup>
                </SelectContent>
                </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loss" className="text-right">
              Loss
            </Label>
            <Input id="loss" type="number" defaultValue={0} inputMode="numeric" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
            <DialogClose>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
