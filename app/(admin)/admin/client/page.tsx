import { getallclient, getallfrelencer } from "@/actions/admin/getallfrelencer";
import React from "react";
import SingleClientPage from "./_compoenets/singleclientpage";

const Page = async () => {
  const frelencers = await getallclient();

  return (
    <div className="mt-32">
      <SingleClientPage frelencers={frelencers} />
    </div>
  );
};

export default Page;
