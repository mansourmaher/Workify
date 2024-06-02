import { getOrders } from "@/actions/get-my-orders";
import React from "react";
import SingleOrdersPage from "./_components/single-orders-page";
import { getBuyerOrders } from "@/actions/getbuyerorders";

const Page = async () => {
  const orders = await getBuyerOrders();
  return (
    <div className="min-h-[80vh] my-10 px-32 mt-32">
      <SingleOrdersPage orders={orders} />
    </div>
  );
};

export default Page;
