"use client"
import { getOrders } from "@/actions/get-my-orders";
import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import { getBuyerOrders } from "@/actions/getbuyerorders";
import { Button } from "@/components/ui/button";
import { handeldeleteorder } from "@/actions/deleteorder";
import { handelcancelorder } from "@/actions/ordercancel";

interface Order {
  orders: Awaited<ReturnType<typeof getBuyerOrders>>;
}

function SingleOrdersPage({ orders }: Order) {
  const handeldeleteordre = async (id: string) => {
    await handeldeleteorder(id);
  };
  const handelcancelordere = async (id: string) => {
    await handelcancelorder(id);
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All your Orders as a buyer</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gig Name
              </th>

              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Send Message
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                  key={order.id}
                >
                  <th scope="row" className="px-6 py-4 ">
                    {order.gig.title}
                  </th>

                  <td className="px-6 py-4">{order.gig.category}</td>
                  <td className="px-6 py-4">{order.price}</td>
                  <td className="px-6 py-4">{order.gig.deliveryTime}</td>
                  <td className="px-6 py-4">
                    {format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    {order.isCompleted ? "Accepted" : "Pending"}
                  </td>

                  <td className="px-6 py-4 ">
                    <Link
                      href={`/buyer/orders/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                  <td className="px-6 py-4 ">
                    {order.isCompleted ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center"
                        onClick={() => handeldeleteordre(order.id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => handelcancelordere(order.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SingleOrdersPage;
