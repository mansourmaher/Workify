"use client";
import { useState } from "react";
import {
  CountrySelect,
  CountrySelectValue,
} from "@/app/landingpage/country-select";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Origin } from "@prisma/client";
import { Button } from "@/components/ui/button";
import UploadImagewithcloudinarincomunity from "@/app/(buyer)/buyer/(community)/community/_componets/comunity-upload-image copy";
import Contact from "@/app/landingpage/contact";
import { getLoggedUser } from "@/actions/getloggeduser";
import { FillInformation } from "@/actions/fill-information";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";

interface SingleUpdateProfileProps {
  user: Awaited<ReturnType<typeof getLoggedUser>>;
}

function SingleUpdateProfile({ user }: SingleUpdateProfileProps) {
  const initialDate = user?.DateOfBirth
    ? new Date(user?.DateOfBirth)
    : new Date();
  const initailFilier = user?.filier ? user?.filier : "";
  const initailImageUrl = user?.profileImage ? user?.profileImage : "";
  const initialeAbout = user?.about ? user?.about : "";
  const initialFilier = user?.filier || "";

  const initialeOrigin = user?.origin || {
    id: "",
    userId: "",
    value: "",
    label: "",
    flag: "",
    region: "",
    lalng: [0, 0],
  };

  const [initailFilierValue, setInitailFilierValue] =
    useState<string>(initailFilier);
  const initialSubtitle = user?.subtitle ? user?.subtitle : "";
  const initialPatients = user?.patiants ? user?.patiants : [];
  const initialLinkin = user?.linkedin ? user?.linkedin : "";
  const initialgithub = user?.github ? user?.github : "";
  const initialtwitter = user?.twitter ? user?.twitter : "";

  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>(initialDate);
  const [optionSelected, setOptionSelected] = useState<string>(initailFilier);
  const [about, setAbout] = useState<string>(initialeAbout);
  const [imageUrl, setImageUrl] = useState<string>(initailImageUrl);
  const [isloading, setIsloading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [origin, setOrigin] = useState<Origin>(initialeOrigin);
  const [patient, setPatient] = useState<string>("");
  const [patiants, setPatiants] = useState<string[]>(initialPatients);
  const [subtitle, setSubtitle] = useState<string>(initialSubtitle);
  const [linkedin, setLinkedin] = useState<string>(initialLinkin);
  const [github, setGithub] = useState<string>(initialgithub);
  const [twitter, setTwitter] = useState<string>(initialtwitter);
  const [username, setUsername] = useState<string>(user?.username!);

  const handelSubmit = async () => {
    setIsloading(true);
    const data = {
      username: username as string,
      date: date as Date,
      optionSelected: optionSelected as string,
      imageUrl: imageUrl as string,
      country: origin as CountrySelectValue,
      about: about as string,
      subtitle: subtitle as string,
      patients: patiants as string[],
      linkedin: linkedin as string,
      github: github as string,
      twitter: twitter as string,
    };
    await FillInformation(data)
      .then((res: any) => {
        if (res.success) {
          toast.success("Profile Information Added Successfully");
        } else {
          toast.error(res.error);
        }
      })
      .then(() => {
        setIsFinished(true);
        setIsloading(false);
      });
  };

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              {imageUrl && (
                <div className="flex-shrink-0 h-12 w-12">
                  <img
                    src={imageUrl}
                    alt="Profile Picture"
                    className="h-18 w-18 rounded-full"
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold">Your account</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              Provide your information to get started.
            </p>
            <div>
              <Label htmlFor="map">Location</Label>
              <div>
                <CountrySelect
                  value={origin}
                  /* @ts-ignore */
                  onChange={(value) => setOrigin(value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="date-picker">Date of Birth</Label>
                <Calendar
                  mode="single"
                  selected={date as Date}
                  onSelect={setDate as any}
                  className="rounded-md border w-full"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div>
                <Label htmlFor="first-name">Email</Label>
                <Input value={user?.email} disabled />
              </div>
              <div>
                <Label htmlFor="last-name">Username </Label>
                <Input value={user?.username!} onChange={(e)=>setUsername(e.target.value)}  />
              </div>
            </div>
            <div>
              <Label htmlFor="contact">Contact Information</Label>
              <Contact
                linkendin={linkedin}
                github={github}
                tiwitter={twitter}
                onlinkedinChange={(value) => setLinkedin(value)}
                ongithubChange={(value) => setGithub(value)}
                ontwitterChange={(value) => setTwitter(value)}
              />
            </div>
            <div>
              <Label htmlFor="profile-picture">Profile Picture</Label>
              <div className="h-32 w-full rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 p-4">
                <div className="flex h-full items-center justify-center">
                  <UploadImagewithcloudinarincomunity
                    value={imageUrl}
                    onchange={(url) => setImageUrl(url)}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                className="h-32"
                id="bio"
                placeholder="Tell us about yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                variant={"primary"}
                onClick={handelSubmit}
                disabled={isloading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUpdateProfile;
