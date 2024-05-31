"use server"

import { auth } from "@/auth";
import { db } from "@/lib/db";


export async function editGigs(gigData:any) {
    try {
        const user = await auth();
        const userId = user?.user.id;
        console.log("user", userId);
        console.log("gigData", gigData);

        await db.gigs.update({
            where: {
                id: gigData.id
            },
            data: {
                ...gigData,
                userId: userId!
            }
        });

    } catch (e) {
        console.error("Error adding gig:", e);
        return null;
    }
}