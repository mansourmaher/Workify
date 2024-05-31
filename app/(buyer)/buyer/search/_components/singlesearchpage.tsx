"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getGigsByFilter } from "@/actions/get-gigs-byfilter";
import { categories } from "@/utils/categories";
import SearchGridItem from "@/app/search/_components/SearchGridItem";

interface SearchPageProps {
  gigs: Awaited<ReturnType<typeof getGigsByFilter>>;
  q?: string;
  category?: string;
}

function Singlesearchpage({ gigs, q }: SearchPageProps) {
  const [filteredJobs, setFilteredJobs] = useState(gigs);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (category === "") {
      setFilteredJobs(gigs);
    } else {
      const filtered = gigs.filter((gig) => gig.category === category);
      setFilteredJobs(filtered);
    }
  }, [category, gigs]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        Explore Gigs
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
          {/* @ts-ignore */}
          {categories.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-4">
        {/* @ts-ignore */}
        {filteredJobs.map((gig) => (
          <SearchGridItem gig={gig} key={gig.id} />
        ))}
      </div>
    </div>
  );
}

export default Singlesearchpage;
