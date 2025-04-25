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
import { useSearchParams } from "react-router"


const intevals = [7, 14, 21, 28]

export default function UpdateEncubationStatusDialog() {
  const [, setSearchParams] = useSearchParams()

  const handleShowComplete = (open: boolean) => {
    setSearchParams(prev => {
      prev.set("complete", open ? "true" : "false")
      return prev
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const interval = formData.get("interval")
    const loss = formData.get("loss")
    const intervalValue = interval ? parseInt(interval.toString()) : 0
    const lossValue = loss ? parseInt(loss.toString()) : 0

    // if the intervalValue is equal to the last interval, show the complete dialog
    if (intervalValue === intevals[intevals.length - 1]) {
      handleShowComplete(true)
    } else {
      handleShowComplete(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sticky bottom-10 mb-10" size="lg">
          Update Encubation Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
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
              <Select name="interval">
                  <SelectTrigger className="w-full col-span-3">
                      <SelectValue placeholder="Select interval" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectGroup>
                      <SelectLabel>Select Interval</SelectLabel>
                      {
                          intevals.map(interval => (<SelectItem key={interval} value={interval.toString()}>Day {interval}</SelectItem>))
                      }
                      </SelectGroup>
                  </SelectContent>
                  </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loss" className="text-right">
                Loss
              </Label>
              <Input id="loss" name="loss" type="number" defaultValue={0} inputMode="numeric" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
              <DialogClose>
                  <Button variant="outline">Cancel</Button>
              </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
