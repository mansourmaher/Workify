"use server"

import { db } from "@/lib/db"


export async function deletegigs(id:string)
{
    await db.gigs.delete({
        where: { id: id },
      });
      return true;
      
}