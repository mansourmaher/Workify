import { getSellerData } from "@/actions/getsellerdata";
import React from "react";
import { getLoggedUser } from "@/actions/get-logged-user";
import Singledash from "./_componets/Singledash";

const Page = async () => {
  const data = await getSellerData();
  const user = await getLoggedUser();

  console.log("data", data);

  return (
    <div className="mt-32">
      <Singledash dashboardData={data} userInfo={user} />
    </div>
  );
};

export default Page;
