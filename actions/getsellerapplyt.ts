"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"
import { getmygigsincludetheirrevneue } from "./dashboard/getmygigsincludetheirrevnue"



export async function getsellerapply()
{
    const user=await auth()
    const userId=user?.user.id
    const gigsrevenue=await db.orders.findMany({
        where:{
            gig:{
                userId:userId
            },
            isCompleted:true
            // isAccepted:true
            
        },
        include:{
            gig:{
                select:{
                    title:true,
                    price:true
                }
            },
            }
    })
    const jobofferrevenue=await db.jobApplication.findMany({
        where:{
            job:{
                userId:userId
            },
            status:"accepted"
            
        },
        include:{
            job:{
                select:{
                    title:true,
                    price:true
                }
            }
        }
    })
    console.log("job"+jobofferrevenue)
    const tottalrevnuecountinalltheorders=gigsrevenue.reduce((acc,order)=>acc+order.gig.price,0)
    const tottalrevnuecountinallthejoboffer=jobofferrevenue.reduce((acc,order)=>acc+order.job.price,0)
    const tabofrevenue=[{name:"Gigs",value:tottalrevnuecountinalltheorders},{name:"Job Offers",value:tottalrevnuecountinallthejoboffer}]

    return tabofrevenue
    

}


export async function getSellerrevenuefromjobofferbymonth()
{
    const user=await auth()
    const userId=user?.user.id
    const jobofferrevenue=await db.jobApplication.findMany({
        where:{
            job:{
                userId:userId
            },
            status:"accepted"
            
        },
        include:{
            job:{
                select:{
                    title:true,
                    price:true
                }
            }
        }
    })
    const months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    const tabofrevenue=months.map((month)=>{
        const totalrevenue=jobofferrevenue.reduce((acc,order)=>{
            if(order.createdAt.getMonth()===months.indexOf(month))
            {
                return acc+order.job.price
            }
            return acc
        },0)
        return {name:month,value:totalrevenue}
    })
    console.log(tabofrevenue)
    return tabofrevenue

}


export async function getTotalrevenuefromgigsandjoboffer()
{
    const user=await auth()
    const userId=user?.user.id
    const revenueeachgigs=await getmygigsincludetheirrevneue()
    const revenuefromgigs=revenueeachgigs.reduce((acc,gig)=>acc+gig.revenue,0)
    const revenuefromjobofferbymonth=await getSellerrevenuefromjobofferbymonth()
    const revenuefromjoboffer=revenuefromjobofferbymonth.reduce((acc,joboffer)=>acc+joboffer.value,0)
    const totalrevenue=revenuefromgigs+revenuefromjoboffer
    return totalrevenue

}

export async function getCompletedOrder()
{
    const totalcompletedorderwithrevenue=await getmygigsincludetheirrevneue()
    const totalorder=totalcompletedorderwithrevenue.reduce((acc,order)=>acc+order.Orders.length,0)
    return totalorder
}
export async function getPendingOrder() {
    const user = await auth();
    const userId = user?.user.id;
  
    const gigs = await db.gigs.findMany({
      where: {
        Orders: {
          some: {
            completedAt: null,
            startedAt: { not: null },
          },
        },
  
        createdBy: {
          id: userId,
        },
      },
      include: {
        Orders: {
          where: {
            completedAt:null
          },
        },
      },
    });
    const pendingorder=gigs.reduce((acc,gig)=>acc+gig.Orders.length,0)
    return pendingorder
}
export async function orderrequest() {
    const user = await auth();
    const userId = user?.user.id;
  
    const gigs = await db.gigs.findMany({
      where: {
        Orders: {
          some: {
            completedAt: null,
            startedAt:null
          },
        },
  
        createdBy: {
          id: userId,
        },
      },
      include: {
        Orders: {
          where: {
            completedAt:null
          },
        },
      },
    });
    const pendingorder=gigs.reduce((acc,gig)=>acc+gig.Orders.length,0)
    return pendingorder
}


   
  