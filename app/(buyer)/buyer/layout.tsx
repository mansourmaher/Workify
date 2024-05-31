import { getLoggedUser } from "@/actions/getloggeduser";
import ClientNavbar from "@/app/landingpage/buyernavbar";
import { auth } from "@/auth";

import Image from "next/image";
import { redirect } from "next/navigation";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  const roleodloggeduser = await getLoggedUser();
  if (!roleodloggeduser) {
    redirect("/sign-in");
  }
  // if (roleodloggeduser.role !== "CLIENT") {
  //   redirect("/seller/dashboard");
  // }

  return (
    <div className="h-full">
      <ClientNavbar />
      <div className="h-full">{children}</div>
    </div>
  );
};
export default LayoutPage;
