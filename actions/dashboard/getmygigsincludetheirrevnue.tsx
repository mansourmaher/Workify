"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { intervalToDuration } from "date-fns";

export async function getmygigsincludetheirrevneue() {
  const user = await auth();
  const userId = user?.user.id;

  const gigs = await db.gigs.findMany({
    where: {
      Orders: {
        some: {
          completedAt: {
            not: null,
          },
        },
      },

      createdBy: {
        id: userId,
      },
    },
    include: {
      Orders: {
        where: {
          completedAt: {
            not: null,
          },
        },
      },
    },
  });
  const gigswithrevneue = await Promise.all(
    gigs.map(async (gig) => {
      const orders = gig.Orders;

      let difrecnebetwenstardateandendate = 0;
      let revenue = 0;
      let intervall = 0;
      orders.map((order) => {
        if (!order.completedAt) return console.log("order not completed");

        const interval = intervalToDuration({
          start: order.startedAt!,
          end: order.completedAt!,
        });
        if (!interval.months) {
          const revneue = order.price * interval.days!;
          revenue += revneue;
          difrecnebetwenstardateandendate += interval.days!;
          intervall += interval.days!;
        }
        if (interval.months) {
          const revneue =
            order.price * interval.months! * 30 + order.price * interval.days!;
          revenue += revneue;
          difrecnebetwenstardateandendate += interval.days!;
          intervall += interval.months! * 30 + interval.days!;
        }
      });
      return {
        ...gig,
        revenue,
        intervall,
      };
    })
  );

  return gigswithrevneue;
}
