import { getMyjobOffers } from "@/actions/get-myjoboffers";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsEyeSlash } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { DeeleteJoboffer } from "./deletejiboffer";

interface JobOffers {
  Jobs: Awaited<ReturnType<typeof getMyjobOffers>>;
}

function SingleMyjoboffers({ Jobs }: JobOffers) {
  return (
    <div className="min-h-[80vh] my-10 mt-0 px-32">
      <h3 className="m-5 text-2xl font-semibold">All Job offers</h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
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
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
                Apply
              </th>
            </tr>
          </thead>
          <tbody>
            {/* @ts-ignore */}
            {Jobs.map((order) => {
              return (
                <tr>
                  <th scope="row" className="px-6 py-4 font-medium">
                    {order.title}
                  </th>
                  <td className="px-6 py-4">{order.category}</td>
                  <td className="px-6 py-4">{order.price}</td>

                  <td className="px-6 py-4">
                    {format(new Date(order.createdAt), "dd/MM/yyyy")}
                  </td>

                  <td className="px-6 py-4 flex items-center space-x-4  ">
                    <Link
                      href={`/buyer/my-job-offers/edit/${order.id}`}
                      className="font-medium text-blue-600  hover:underline"
                    >
                      Edit
                    </Link>
                    <DeeleteJoboffer gigsId={order.id} />
                  </td>
                  <td className="px-6 py-4  ">
                    <Link
                      href={`/buyer/joboffer/apply/${order.id}`}
                      className="font-medium text-blue-600  hover:underline flex space-x-2"
                    >
                      <Eye size={18} /> View
                    </Link>
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

export default SingleMyjoboffers;
