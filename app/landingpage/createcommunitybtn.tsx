"use client";
import { createCommunity } from "@/actions/create-new-community";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export function DialogDemo() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handelcreateCommunity = async () => {
    await createCommunity(title);
    toast.success("Community created successfully");
    router.refresh();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full p-2 cursor-pointer" variant={"outline"}>
          Create Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={title}
              className="col-span-3"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handelcreateCommunity} variant={"outline"}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
