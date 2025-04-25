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

export default function NewDetectionDialog() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sticky bottom-0" size="lg">
          New Detection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Egg Gender/Life Detection</DialogTitle>
            <DialogDescription>
              This will create a new batch of detection of eggs. Are you sure you want to proceed?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Image</Label>
              <Input 
                id="picture" 
                type="file"
                accept="image/jpg, image/png, image/jpeg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loss" className="text-right">
                Loss
              </Label>
              <Select name="interval">
                <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select detection type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Select detection type</SelectLabel>
                      <SelectItem value="gender">Gender</SelectItem>
                      <SelectItem value="file">Life</SelectItem>
                    </SelectGroup>
                </SelectContent>
                </Select>
            </div>
          </div>
          <DialogFooter>
              <DialogClose>
                  <Button variant="outline">Cancel</Button>
              </DialogClose>
            <Button type="submit">Detect Now</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
