"use client";
import { getalljoboffersdispo } from "@/actions/get-alljoboffersdispo";
import React, { useState, useEffect } from "react";
import { categories } from "@/utils/categories";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SingleJobListProps {
  jobs: {
    id: number;
    title: string;
    category: string;
    description: string;
    createdAt: string;
    imagesrc: string;
    price: number;

    createdBy: {
      id: number;
      profileImage?: string;
      email?: string;
      username?: string;
      Job: {
        id: number;
      }[];
    };
  }[];
}

function SingleJobList({ jobs }: SingleJobListProps) {
  const router = useRouter();
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => job.category === category);
      setFilteredJobs(filtered);
    }
  }, [category, jobs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Explore Job Offers
      </h1>
      <div className="flex items-center justify-center mb-6">
        <label htmlFor="categories" className="text-gray-700 mr-4">
          Filter by Category:
        </label>
        <select
          id="categories"
          className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-950 m-4 transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-100"
          >
            <img
              alt="Profile"
              className="w-full h-48 object-cover"
              height={250}
              src={job.imagesrc || "/default-profile.jpg"}
              style={{
                aspectRatio: "400/250",
                objectFit: "cover",
              }}
              width={400}
            />
            <div className="p-4">
              <div className="flex justify-between items-center mr-4">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p>
                  <strong className="font-medium">From ${job.price}</strong>
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary font-semibold">
                  {job.category}
                </span>

                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Created {format(new Date(job.createdAt), "dd/MM/yyyy")}
                </span>
              </div>
              <p className="text-gray-600 mb-4  line-clamp-3">
                {job.description}
              </p>
              <div className="flex justify-between items-center mx-2  hover:text-blue-500">
                <div className="flex space-x-2 items-center">
                  <Avatar>
                    <AvatarImage
                      src={job.createdBy.profileImage || "/default-profile.jpg"}
                      alt="profile"
                      height={30}
                      width={30}
                      className="rounded-full"
                    ></AvatarImage>
                    <AvatarFallback>
                      <div className="bg-purple-500 h-7 w-7 flex items-center justify-center rounded-full relative">
                        <span className="text-lg text-white">
                          {job.createdBy.email![0].toUpperCase()}
                        </span>
                      </div>
                    </AvatarFallback>
                  </Avatar>
                  <span className=" dark:text-gray-400 text-sm">
                    <p>{job.createdBy.email}</p>
                    <p>{job.createdBy.username}</p>
                  </span>
                </div>

                <p>{job.createdBy.Job.length} Offers</p>
              </div>
              <div className="flex justify-end">
                <Button
                  className="mt-4 bg-blue-400 text-white hover:bg-blue-500 flex justify-end"
                  onClick={() => router.push(`/seller/job-offer/${job.id}`)}
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleJobList;
