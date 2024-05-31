"use server"

import { db } from "@/lib/db";

export async function getUsersInCommunity(communityId: string) {
    return await db.community.findMany({
        
        where: {
        id:communityId,
        },
        include: {
            posts:{
                include:{
                    user:{
                        select:{
                            username:true,
                            email:true,
                            id:true,
                            profileImage:true
                        }
                    }
                }
            }
        },
        
    });
    
    }


   export async function getAllusersInComunityById(communityId: string) {
    const users= await db.post.findMany({
        distinct:["userId"],
        where:{
            communityId:communityId
        },
        include:{
            user:true
        }
    });
    const userIncludePostsCount=Promise.all(users.map(async user=>{
        const postsCount=await db.post.count({
            where:{
                userId:user.userId
            }
        })
        return {...user,postsCount}
    }))
    
   
    return userIncludePostsCount

    
    
    }