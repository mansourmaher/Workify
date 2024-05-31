"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"



export async function getcategdistinct()
{
    const user=await auth()
    const userId=user?.user.id
    const sellerapply=await db.jobApplication.findMany({
        where:{
            userId:userId,
            // isAccepted:true
        },include:{
            job:{
                select:{
                    category:true
                }
            }
        }
    })
    const graficdesign=sellerapply.filter((item)=>item.job.category=="Graphic Design").length
    const digitalmarketing=sellerapply.filter((item)=>item.job.category=="Digital Marketing").length
    const videoanimation=sellerapply.filter((item)=>item.job.category=="Video & Animation").length
    const programmingtech=sellerapply.filter((item)=>item.job.category=="Programming & Tech").length
    const business=sellerapply.filter((item)=>item.job.category=="Business").length
    const lifestyle=sellerapply.filter((item)=>item.job.category=="Lifestyle").length
    const categwithcount=[
        {name:"Graphic Design",count:graficdesign},
        {name:"Digital Marketing",count:digitalmarketing},
        {name:"Video & Animation",count:videoanimation},
        {name:"Programming & Tech",count:programmingtech},
        {name:"Business",count:business},
        {name:"Lifestyle",count:lifestyle},
    
    ]
    return categwithcount

}

/*export const categories = [
  { name: "Graphic Design", logo: "/service-1.svg" },
  { name: "Digital Marketing", logo: "/service-2.svg" },
  { name: "Video & Animation", logo: "/service-4.svg" },
  { name: "Programming & Tech", logo: "/service-6.svg" },
  { name: "Business", logo: "/service-7.svg" },
  { name: "Lifestyle", logo: "/service-8.svg" },
];
*/