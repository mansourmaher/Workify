"use client";
import { getMypostuledJobs } from "@/actions/get-mypostuled-jobs";
import { handeldeleteapply } from "@/actions/handeldeleteapply";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { ContractModal } from "../_compoents/contractmodal";
import { ReportBtn } from "./reportclientbtn";

interface Apply {
  apply: Awaited<ReturnType<typeof getMypostuledJobs>>;
}

function PostuledJobs({ apply }: Apply) {
  const handeldeleteapplye = async (id: string) => {
    await handeldeleteapply(id);
  };

  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">
        You have Postuled in {apply.length} jobs
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Job Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>

              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {apply.map((order) => {
              return (
                <tr
                  className="bg-white dark:bg-gray-800 hover:bg-gray-50"
                  key={order.id}
                >
                  <th scope="row" className="px-6 py-4 font-medium">
                    {order.job.title}
                  </th>
                  <td className="px-6 py-4">{order.job.category}</td>
                  <td className="px-6 py-4">{order.job.price}</td>

                  <td className="px-6 py-4">
                    {format(new Date(order.job.createdAt), "dd/MM/yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span>{order.job.createdBy.username}</span>
                      <span>{order.job.createdBy.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span>{order.status}</span>
                  </td>

                  <td className="px-6 py-4  ">
                    <Link
                      href={`/seller/apply/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                  <td className="px-6 py-4  ">
                    <div className="flex space-x-3 items-center">
                      {order.status === "pending" ? (
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handeldeleteapplye(order.id)}
                        >
                          Delete
                        </Button>
                      ) : (
                        <>
                          <ContractModal applyId={order.id} />
                          <ReportBtn clienttoreport={order.job.createdBy} />
                        </>
                      )}
                    </div>
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

export default PostuledJobs;
