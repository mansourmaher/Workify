"use client";
import { acceptApply } from "@/actions/acceptapply";
import { gettheapplyinjobbijonid } from "@/actions/gettheapplyinjobbijonid";
import { rejectApply } from "@/actions/rejectapply";
import { ContractModal } from "@/app/seller/postuled-jobs/_compoents/contractmodal";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Eye, File, FileText } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface SingleMyonlyjobapplyProps {
  apply: Awaited<ReturnType<typeof gettheapplyinjobbijonid>>;
}

function SingleMyonlyjobapply({ apply }: SingleMyonlyjobapplyProps) {
  const router = useRouter();
  const handelreject = async (id: string) => {
    await rejectApply(id);
    router.refresh();
  };
  const handelaccept = async (id: string) => {
    await acceptApply(id);
    router.refresh();
  };
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">
        You have {apply.length} applications in this job
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
                Applied By
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
                      <span>{order.user.username}</span>
                      <span>{order.user.email}</span>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium">
                    {order.status}
                  </th>

                  <td className="px-6 py-4  ">
                    <Link
                      href={`/buyer/apply/messages/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                  <td className="px-6 py-4  ">
                    <div className="flex space-x-3 items-center">
                      {order.status === "pending" && (
                        <div className="flex gap-x-4">
                          <Button
                            onClick={() => handelreject(order.id)}
                            className="bg-red-400 hover:bg-red-500"
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={() => handelaccept(order.id)}
                            className="bg-sky-400 hover:bg-sky-500"
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                      {order.status === "accepted" && (
                        <ContractModal applyId={order.id} />
                      )}
                      {order.status === "rejectjed" && (
                        <Button
                          className="bg-red-400 hover:bg-red-500"
                          disabled
                        >
                          Rejected
                        </Button>
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

export default SingleMyonlyjobapply;
