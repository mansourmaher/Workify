import { getallfrelencer } from "@/actions/admin/getallfrelencer";
import React from "react";
import SingleFrelencer from "./_componets/singlefrelecnerpage";

const Page = async () => {
  const frelencers = await getallfrelencer();

  return (
    <div className="mt-32">
      <SingleFrelencer frelencers={frelencers} />
    </div>
  );
};

export default Page;
