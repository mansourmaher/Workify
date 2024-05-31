"use server"

import { db } from "@/lib/db"


export async function createCommunity(name:string) {
  const community = await db.community.create({
    data: {
      title:name,
      
    }
  })
  return community
}