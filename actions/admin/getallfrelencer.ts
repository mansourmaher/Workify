"use server"

import { db } from "@/lib/db"



export async function getallfrelencer()
{
    const frelencers=await db.user.findMany(
        {
            where:{
                role:"FREELANCER"
            },
            include:{
                Gigs:{
                   include:{
                    Reviews:{
                        select:{
                            rating:true

                        }

                    },
                    
                   }
                },
                reported:true
            }
            
        }
    )
    // console.log(JSON.stringify(frelencers,null,2))
    //@ts-ignore

    const frelencerwithavrgrating=await Promise.all(frelencers.map(async (frelencer)=>{
        const rating=frelencer.Gigs.map(gig=>gig.Reviews.map(review=>review.rating)).flat()
        const avgrating=rating.reduce((a,b)=>a+b,0)/rating.length
        return {...frelencer,avgrating}
    }))
    // console.log(JSON.stringify(frelencerwithavrgrating,null,2))
        
    return frelencerwithavrgrating
}
export async function getallclient()
{
    const frelencers=await db.user.findMany(
        {
            where:{
                role:"CLIENT"
            },
            include:{
                Gigs:{
                   include:{
                    Reviews:{
                        select:{
                            rating:true

                        }

                    },
                    
                   }
                },
                reported:true
            }
            
        }
    )
    // console.log(JSON.stringify(frelencers,null,2))
        //@ts-ignore
    const frelencerwithavrgrating=await Promise.all(frelencers.map(async (frelencer)=>{
        const rating=frelencer.Gigs.map(gig=>gig.Reviews.map(review=>review.rating)).flat()
        const avgrating=rating.reduce((a,b)=>a+b,0)/rating.length
        return {...frelencer,avgrating}
    }))
    // console.log(JSON.stringify(frelencerwithavrgrating,null,2))
        
    return frelencerwithavrgrating
}




