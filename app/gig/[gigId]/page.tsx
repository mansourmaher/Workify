import React from "react";
import Details from "./_compoenets/Details";
import Pricing from "./_compoenets/Pricing";
import { getGigsById } from "@/actions/get-gigs-byid";
import { getLoggedUser } from "@/actions/get-logged-user";

const Page = async ({
  params,
}: {
  params: {
    gigId: string;
  };
}) => {
  console.log(params.gigId);
  const gig = await getGigsById(params.gigId);
  const userInfo=await getLoggedUser();
  return (
    <div className="grid grid-cols-3 mx-32 gap-20 mt-32">
      <Details gigData={gig} />
      <Pricing gigData={gig} userInfo={userInfo} />
    </div>
  );
};

export default Page;
